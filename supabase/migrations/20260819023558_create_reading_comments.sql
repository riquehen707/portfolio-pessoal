create table public.reading_comments (
  id uuid primary key default gen_random_uuid(),
  work_id text not null check (work_id ~ '^read_work_[a-z0-9_]+$'),
  display_name varchar(60) not null check (char_length(trim(display_name)) between 2 and 60),
  body varchar(1200) not null check (char_length(trim(body)) between 20 and 1200),
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected', 'deleted')),
  submitter_hash char(64) not null check (submitter_hash ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now(),
  moderated_at timestamptz,
  constraint reading_comments_moderation_date check (
    (status = 'pending' and moderated_at is null)
    or (status <> 'pending' and moderated_at is not null)
  )
);

comment on table public.reading_comments is 'Comentários enviados para fichas do acervo de leitura; somente registros publicados podem ser exibidos.';
comment on column public.reading_comments.submitter_hash is 'HMAC-SHA256 do IP normalizado; usado apenas para limitar abuso sem armazenar o endereço.';

create index reading_comments_public_by_work
  on public.reading_comments (work_id, created_at desc)
  where status = 'published';

create index reading_comments_rate_limit
  on public.reading_comments (submitter_hash, created_at desc);

alter table public.reading_comments enable row level security;
revoke all on table public.reading_comments from anon, authenticated;
grant select, insert, update, delete on table public.reading_comments to service_role;

create function public.enforce_reading_comment_rate_limit()
returns trigger
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
begin
  if exists (
    select 1 from public.reading_comments
    where submitter_hash = new.submitter_hash
      and created_at > now() - interval '60 seconds'
  ) then
    raise exception using errcode = 'P0001', message = 'Aguarde um minuto antes de enviar outro comentário.';
  end if;

  if (
    select count(*) from public.reading_comments
    where submitter_hash = new.submitter_hash
      and created_at > now() - interval '24 hours'
  ) >= 5 then
    raise exception using errcode = 'P0001', message = 'Limite diário de comentários atingido.';
  end if;

  return new;
end;
$$;

revoke all on function public.enforce_reading_comment_rate_limit() from public, anon, authenticated;
grant execute on function public.enforce_reading_comment_rate_limit() to service_role;

create trigger reading_comments_rate_limit_before_insert
before insert on public.reading_comments
for each row execute function public.enforce_reading_comment_rate_limit();
