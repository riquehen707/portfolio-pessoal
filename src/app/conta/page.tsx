import { redirect } from "next/navigation";
import { Column, Heading, Text, Button, Row, Line, Tag, Grid, Card } from "@once-ui-system/core";
import { auth, signOut } from "@/auth";
import { account, blog, daily, servicesPage } from "@/resources";
import { ProfileForm } from "@/components/account/ProfileForm";
import { PasswordForm } from "@/components/account/PasswordForm";
import { prisma } from "@/lib/prisma";

async function handleSignOut() {
  "use server";
  await signOut();
}

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?next=/conta");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, image: true, bio: true, role: true },
  });
  if (!user) {
    redirect("/auth/login?next=/conta");
  }

  const roleLabel = user.role === "ADMIN" ? "Admin" : "Usuário";
  const quickLinks = [
    { label: "Blog", href: blog.path },
    { label: "Diário aberto", href: daily.path },
    { label: "Serviços", href: servicesPage.path },
  ];

  return (
    <Column maxWidth="s" paddingTop="32" gap="24">
      <Heading as="h1" variant="heading-strong-xl">
        {account.title}
      </Heading>
      <Text onBackground="neutral-weak">{account.description}</Text>

      <Grid columns="3" s={{ columns: 1 }} gap="16">
        <Card
          direction="column"
          gap="8"
          paddingX="20"
          paddingY="20"
          radius="l"
          background="surface"
          style={{ background: "var(--surface-weak)" }}
          border="neutral-alpha-weak"
          fillHeight
        >
          <Text variant="label-default-s" onBackground="neutral-weak">
            Perfil
          </Text>
          <Heading as="h3" variant="heading-strong-m">
            {user?.name || "Sem nome"}
          </Heading>
          <Text onBackground="neutral-weak">{user?.email}</Text>
          {user?.bio && <Text onBackground="neutral-weak">{user.bio}</Text>}
        </Card>
        <Card
          direction="column"
          gap="8"
          paddingX="20"
          paddingY="20"
          radius="l"
          background="surface"
          style={{ background: "var(--surface-weak)" }}
          border="neutral-alpha-weak"
          fillHeight
        >
          <Text variant="label-default-s" onBackground="neutral-weak">
            Acesso
          </Text>
          <Heading as="h3" variant="heading-strong-m">
            {roleLabel}
          </Heading>
          <Text onBackground="neutral-weak">
            Atualize sua senha e mantenha sua conta segura.
          </Text>
        </Card>
        <Card
          direction="column"
          gap="8"
          paddingX="20"
          paddingY="20"
          radius="l"
          background="surface"
          style={{ background: "var(--surface-weak)" }}
          border="neutral-alpha-weak"
          fillHeight
        >
          <Text variant="label-default-s" onBackground="neutral-weak">
            Atalhos
          </Text>
          <Row gap="8" wrap>
            {quickLinks.map((link) => (
              <Button key={link.href} href={link.href} variant="tertiary" size="s">
                {link.label}
              </Button>
            ))}
          </Row>
        </Card>
      </Grid>

      <Column
        padding="20"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
        gap="12"
      >
        <Row gap="12" vertical="center">
          <Heading as="h2" variant="heading-strong-s">
            {user?.name || "Conta"}
          </Heading>
          <Tag size="s">{roleLabel}</Tag>
        </Row>
        <Text onBackground="neutral-weak">{user?.email}</Text>
        <Line maxWidth="64" />
        <form action={handleSignOut}>
          <Button type="submit" variant="secondary" size="s">
            Sair
          </Button>
        </form>
      </Column>

      <Column gap="12">
        <Heading as="h2" variant="heading-strong-s">
          Perfil
        </Heading>
        <Text onBackground="neutral-weak">
          Atualize nome, avatar e bio. Esses dados podem aparecer em posts e comentários futuros.
        </Text>
        <ProfileForm
          name={user?.name}
          image={user?.image}
          bio={user?.bio}
        />
      </Column>

      <Column gap="12">
        <Heading as="h2" variant="heading-strong-s">
          Segurança
        </Heading>
        <Text onBackground="neutral-weak">
          Defina uma nova senha sempre que precisar. Se você ainda não definiu senha, basta escolher uma.
        </Text>
        <PasswordForm />
      </Column>
    </Column>
  );
}
