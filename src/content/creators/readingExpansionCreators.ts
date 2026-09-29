import { CreatorSchema, type Creator } from "./creatorSchema";

const checked = "2026-09-29";

const creator = (id: string, name: string, countryOrRegion: string, occupations: string[], summary: string, url: string): Creator => CreatorSchema.parse({
  id: `person_${id}`,
  slug: id.replaceAll("_", "-"),
  name,
  kind: "person",
  status: "published",
  countryOrRegion,
  occupations,
  summary,
  workIds: [],
  sources: [{ title: `${name} — fonte editorial`, url, kind: "primary" }],
  createdAt: checked,
  updatedAt: checked,
});

export const readingExpansionCreators: Creator[] = [
  creator("art_spiegelman", "Art Spiegelman", "Estados Unidos", ["Quadrinista", "Roteirista"], "Quadrinista norte-americano responsável por Maus, obra que articula memória familiar, testemunho e linguagem dos quadrinhos.", "https://www.companhiadasletras.com.br/9788535906288-maus-4064/p"),
  creator("marjane_satrapi", "Marjane Satrapi", "Irã / França", ["Quadrinista", "Autora", "Cineasta"], "Autora iraniana-francesa cuja obra autobiográfica aborda revolução, exílio, família e formação política.", "https://www.companhiadasletras.com.br/livro/9788535911626/persepolis-completo"),
  creator("marcelo_dsalete", "Marcelo D'Salete", "Brasil", ["Quadrinista", "Ilustrador", "Professor"], "Quadrinista brasileiro que pesquisa histórias negras e a experiência da escravidão e da resistência no Brasil.", "https://veneta.com.br/collections/marcelo-dsalete"),
  creator("svetlana_aleksievitch", "Svetlana Aleksiévitch", "Belarus", ["Escritora", "Jornalista"], "Escritora bielorrussa conhecida por livros de não ficção construídos a partir de vozes e testemunhos.", "https://www.companhiadasletras.com.br/9788535927436-a-guerra-nao-tem-rosto-de-mulher/p"),
  creator("antonio_macedo_soares", "Antonio de Macedo Soares", "Brasil", ["Tradutor"], "Tradutor creditado na edição brasileira de Maus publicada pela Quadrinhos na Cia.", "https://www.companhiadasletras.com.br/9788535906288-maus-4064/p"),
  creator("paulo_werneck", "Paulo Werneck", "Brasil", ["Tradutor"], "Tradutor creditado na edição brasileira de Persépolis completo publicada pela Quadrinhos na Cia.", "https://www.companhiadasletras.com.br/livro/9788535911626/persepolis-completo"),
  creator("cecilia_rosas", "Cecília Rosas", "Brasil", ["Tradutora"], "Tradutora do russo creditada na edição brasileira de A guerra não tem rosto de mulher.", "https://www.companhiadasletras.com.br/9788535927436-a-guerra-nao-tem-rosto-de-mulher/p"),
];
