import { getAllBlogPosts, getBlogPostFormat, getBlogPrimaryCategory } from "@/app/blog/postData";
import { seoLibraryPath, understandSearchBookPath } from "@/app/blog/seo/seoLibraryData";
import { blog, home } from "@/resources";
import { getPublishedIdeas } from "@/data/ideas";

export type GlobalSearchItemType = "article" | "idea" | "page";

export type GlobalSearchItem = {
  id: string;
  type: GlobalSearchItemType;
  title: string;
  description: string;
  href: string;
  label: string;
  keywords: string[];
  date?: string;
};

function stripText(value?: string) {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[#>*_{}[\]()|~:-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(value?: string, maxLength = 180) {
  const text = stripText(value);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function uniq(values: Array<string | undefined | null>) {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value?.trim()))));
}

function pageItem({
  id,
  title,
  description,
  href,
  keywords = [],
}: {
  id: string;
  title: string;
  description: string;
  href: string;
  keywords?: string[];
}): GlobalSearchItem {
  return {
    id,
    type: "page",
    title,
    description,
    href,
    label: "Página",
    keywords: uniq([title, description, ...keywords]),
  };
}

export async function getGlobalSearchItems(): Promise<GlobalSearchItem[]> {
  const ideas = await getPublishedIdeas();
  const staticPages: GlobalSearchItem[] = [
    pageItem({
      id: "page-home",
      title: home.title,
      description: home.description,
      href: home.path,
      keywords: ["inicio", "biblioteca", "blog", "artigos"],
    }),
    pageItem({
      id: "page-blog",
      title: blog.title,
      description: blog.description,
      href: blog.path,
      keywords: ["blog", "artigos", "guias", "biblioteca"],
    }),
    pageItem({
      id: "page-ideas",
      title: "Ideias",
      description: "Caderno público de ideias, experimentos, decisões e aprendizados em andamento.",
      href: "/ideias",
      keywords: ["ideias", "experimentos", "laboratório", "arquivo público", "aprendizados"],
    }),
    pageItem({
      id: "page-collection",
      title: "Acervo cultural",
      description:
        "Filmes, livros, mangás, quadrinhos e séries organizados em bibliotecas e curadorias editoriais.",
      href: "/acervo",
      keywords: ["acervo", "filmes", "livros", "mangas", "quadrinhos", "series", "curadorias"],
    }),
    pageItem({
      id: "page-movies",
      title: "Biblioteca de filmes",
      description: "Filmes pesquisados, relacionados e reutilizados nas curadorias do site.",
      href: "/filmes",
      keywords: ["cinema", "filmes", "terror", "animação", "diretores", "estudios"],
    }),
    pageItem({
      id: "page-series",
      title: "Biblioteca de séries",
      description: "Séries pesquisadas, relacionadas e reutilizadas nas curadorias do site.",
      href: "/series",
      keywords: ["televisão", "séries", "minisséries", "terror", "animação", "streaming"],
    }),
    pageItem({
      id: "page-books",
      title: "Biblioteca de livros",
      description: "Livros e light novels organizados por obra, autoria, edição e disponibilidade.",
      href: "/livros",
      keywords: ["livros", "light novels", "autores", "leitura", "edições"],
    }),
    pageItem({
      id: "page-comics",
      title: "Biblioteca de quadrinhos e mangás",
      description: "Mangás, manhwas, manhuas, HQs e graphic novels no catálogo central de leitura.",
      href: "/quadrinhos",
      keywords: ["quadrinhos", "mangas", "manhwas", "manhuas", "hqs", "graphic novels"],
    }),
    pageItem({
      id: "page-personalities",
      title: "Acervo de personalidades",
      description: "Escritores, filósofos, cineastas e artistas relacionados às obras do acervo.",
      href: "/personalidades",
      keywords: ["personalidades", "autores", "diretores", "filósofos", "mangakás", "roteiristas"],
    }),
    pageItem({
      id: "page-studios",
      title: "Acervo de estúdios",
      description: "Estúdios criativos organizados por país, especialidade e período de atividade.",
      href: "/estudios",
      keywords: ["estúdios", "animação", "cinema", "produtoras", "organizações"],
    }),
    pageItem({
      id: "page-seo-library",
      title: "Biblioteca de SEO",
      description:
        "Aprenda como a busca funciona, construa estratégias melhores e desenvolva competências profissionais em SEO.",
      href: seoLibraryPath,
      keywords: [
        "seo",
        "busca",
        "otimização",
        "livros",
        "indexação",
        "relevância",
        "search console",
      ],
    }),
    pageItem({
      id: "page-seo-book-understand-search",
      title: "Entender a busca",
      description:
        "Livro introdutório sobre descoberta, rastreamento, indexação, intenção, classificação e arquitetura de sites.",
      href: understandSearchBookPath,
      keywords: [
        "seo",
        "livro de seo",
        "mecanismos de busca",
        "rastreamento",
        "indexação",
        "ranking",
        "intenção de busca",
      ],
    }),
    pageItem({
      id: "page-culture",
      title: "Cultura",
      description:
        "Perfis editoriais para entender pensadores, estúdios, obras e movimentos com contexto e fontes.",
      href: "/blog/cultura",
      keywords: [
        "cultura",
        "filosofia",
        "cinema",
        "animação",
        "Friedrich Nietzsche",
        "Studio Ghibli",
      ],
    }),
    pageItem({
      id: "page-studio-ghibli",
      title: "Studio Ghibli",
      description: "Perfil permanente do estúdio: identidade, pessoas centrais, filmografia e caminhos para começar.",
      href: "/estudios/studio-ghibli",
      keywords: ["Studio Ghibli", "animação japonesa", "Hayao Miyazaki", "Isao Takahata", "filmes do Studio Ghibli"],
    }),
    pageItem({
      id: "page-laika",
      title: "LAIKA",
      description: "Perfil permanente do estúdio: stop-motion, processo híbrido, filmografia e caminhos para começar.",
      href: "/estudios/laika",
      keywords: ["LAIKA", "stop-motion", "Coraline", "Kubo", "Wildwood", "estúdio de animação"],
    }),
    pageItem({
      id: "page-cartoon-saloon",
      title: "Cartoon Saloon",
      description: "Perfil permanente do estúdio: animação 2D, folclore, coproduções, pessoas e obras.",
      href: "/estudios/cartoon-saloon",
      keywords: ["Cartoon Saloon", "animação irlandesa", "Tomm Moore", "Nora Twomey", "Song of the Sea", "WolfWalkers"],
    }),
    pageItem({
      id: "page-aardman",
      title: "Aardman",
      description: "Perfil permanente do estúdio: stop-motion, comédia visual, produção artesanal, pessoas e obras.",
      href: "/estudios/aardman",
      keywords: ["Aardman", "stop-motion", "Wallace e Gromit", "Shaun the Sheep", "Chicken Run", "Nick Park"],
    }),
    pageItem({
      id: "page-science-saru",
      title: "Science SARU",
      description: "Perfil permanente do estúdio: desenho expressivo, produção digital, pessoas, fases e obras.",
      href: "/estudios/science-saru",
      keywords: ["Science SARU", "anime", "Masaaki Yuasa", "Eunyoung Choi", "DAN DA DAN", "Eizouken", "Inu-Oh"],
    }),
    pageItem({
      id: "page-kyoto-animation",
      title: "Kyoto Animation",
      description: "Perfil permanente do estúdio: história, formação, linguagem visual, pessoas e obras essenciais.",
      href: "/estudios/kyoto-animation",
      keywords: ["Kyoto Animation", "KyoAni", "anime", "A Silent Voice", "Violet Evergarden", "K-ON!", "Hyōka"],
    }),
  ];

  const articleItems: GlobalSearchItem[] = getAllBlogPosts().map((post) => {
    const category = getBlogPrimaryCategory(post);
    const format = getBlogPostFormat(post);

    return {
      id: `article-${post.slug}`,
      type: "article",
      title: post.metadata.title,
      description: post.metadata.summary || excerpt(post.content),
      href: `${blog.path}/${post.slug}`,
      label: format,
      date: post.metadata.updatedAt ?? post.metadata.publishedAt,
      keywords: uniq([
        category,
        format,
        post.collection,
        post.metadata.tag,
        post.metadata.category,
        ...(post.metadata.tags ?? []),
        ...(post.metadata.categories ?? []),
        ...(post.metadata.keywords ?? []),
        post.metadata.primaryKeyword,
        ...(post.metadata.secondaryKeywords ?? []),
        excerpt(post.content, 320),
      ]),
    };
  });

  const ideaItems: GlobalSearchItem[] = ideas.map((idea) => ({
    id: `idea-${idea.id}`,
    type: "idea",
    title: idea.title,
    description: idea.description,
    href: `/ideias/${idea.slug}`,
    label: "Ideia",
    date: idea.updatedAt,
    keywords: uniq([...idea.categories, ...idea.tags, ideaStatusLabelsForSearch[idea.status]]),
  }));

  return [...staticPages, ...ideaItems, ...articleItems];
}

const ideaStatusLabelsForSearch = {
  rascunho: "rascunho",
  explorando: "explorando",
  "em-desenvolvimento": "em desenvolvimento",
  pausada: "pausada",
  concluida: "concluída",
  abandonada: "abandonada",
} as const;
