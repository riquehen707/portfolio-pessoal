const labels: Record<string, string> = {
  author: "Autoria", writer: "Texto", illustrator: "Ilustração", translator: "Tradução", editor: "Edição", adapter: "Adaptação",
  artist: "Arte", penciller: "Desenho", inker: "Arte-final", letterer: "Letreiramento", colorist: "Cores", "original-creator": "Criação original", other: "Outro crédito",
  book: "Livro", "light-novel": "Light novel", hardcover: "Capa dura", paperback: "Brochura", "mass-market": "Edição de bolso", digital: "Digital", web: "Leitura na web", omnibus: "Omnibus", "box-set": "Box",
  available: "Disponível", preorder: "Pré-venda", unavailable: "Indisponível", "out-of-print": "Fora de catálogo", unknown: "Não verificada",
  announced: "Anunciada", ongoing: "Em publicação", completed: "Concluída", hiatus: "Em pausa", cancelled: "Cancelada",
};
export function readingLabel(value: string) { return labels[value] ?? value; }
