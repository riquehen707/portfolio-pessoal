import type { ReadingEdition, ReadingWork } from "./readingSchema";

// Metadados editoriais de exemplares BR com ISBN verificado. Imagens de catálogo têm atribuição
// e direitos de reutilização pendentes; o botão comercial executa busca pelo ISBN, não oferta confirmada.
const checkedAt = "2026-10-14";
const books = [
 {
  key:"sete_breves_licoes_fisica",slug:"sete-breves-licoes-de-fisica",name:"Sete breves lições de física",original:"Sette brevi lezioni di fisica",
  person:"person_carlo_rovelli",country:"Itália",lang:"Italiano",year:"2014",categories:["science"] as ReadingWork["categories"],themes:["Relatividade","Mecânica quântica","Cosmologia","Partículas"],
  description:"Sete textos breves que apresentam ideias centrais da física contemporânea sem exigir cálculo avançado do leitor.",
  publisher:"org_objetiva",isbn:"9788539007097",pages:96,publish:"2015-01-01",
  url:"https://www.companhiadasletras.com.br/livro/9788539007097/sete-breves-licoes-de-fisica",
  img:"https://is1-ssl.mzstatic.com/image/thumb/Publication127/v4/5e/14/4f/5e144f6b-4702-e15a-0ead-c995a96c1721/1018742005.jpg/1200x1200wz.jpg",
  imgCredit:"Objetiva / capa em catálogo Apple Books",extra:"Tradução: Joana Angélica d’Avila Melo."
 },
 {
  key:"uma_breve_historia_tempo_hawking",slug:"uma-breve-historia-do-tempo-hawking",name:"Uma breve história do tempo",original:"A Brief History of Time",
  person:"person_stephen_hawking",country:"Reino Unido",lang:"Inglês",year:"1988",categories:["science"] as ReadingWork["categories"],themes:["Buracos negros","Universo","Tempo","Cosmologia"],
  description:"Introdução conceitual à cosmologia, gravitação, história do universo e dilemas da física fundamental.",
  publisher:"org_intrinseca",isbn:"9788580576467",pages:256,publish:"2015-01-01",
  url:"https://loja.intrinseca.com.br/uma-breve-historia-do-tempo/",
  img:"https://martinsfontespaulista.vteximg.com.br/arquivos/ids/1429431-1000-1000/745472.jpg?v=638556237221300000",
  imgCredit:"Intrínseca / catálogo Martins Fontes Paulista",extra:"Edição brasileira de 2015. Tradução: Cássio de Arantes Leite."
 },
 {
  key:"realidade_nao_e_o_que_parece",slug:"a-realidade-nao-e-o-que-parece",name:"A realidade não é o que parece",original:"La realtà non è come ci appare",
  person:"person_carlo_rovelli",country:"Itália",lang:"Italiano",year:"2014",categories:["science"] as ReadingWork["categories"],themes:["História da física","Espaço-tempo","Gravidade quântica","Filosofia da ciência"],
  description:"Carlo Rovelli reconstrói a transformação das ideias sobre espaço, tempo, matéria e a busca contemporânea pela gravidade quântica.",
  publisher:"org_objetiva",isbn:"9788547000257",pages:296,publish:"2017-01-01",
  url:"https://www.companhiadasletras.com.br/livro/9788547000257/a-realidade-nao-e-o-que-parece",
  img:"https://amancheia.com.br/41587-large_default/a-realidade-nao-e-o-que-parece-carlo-rovelli.jpg",
  imgCredit:"Objetiva / catálogo A Mão Cheia",extra:"Tradução: Silvana Cobucci. Discussões de gravidade quântica incluem hipóteses em pesquisa."
 },
 {
  key:"a_ordem_do_tempo_rovelli",slug:"a-ordem-do-tempo-carlo-rovelli",name:"A ordem do tempo",original:"L'ordine del tempo",
  person:"person_carlo_rovelli",country:"Itália",lang:"Italiano",year:"2017",categories:["science"] as ReadingWork["categories"],themes:["Tempo","Entropia","Termodinâmica","Relatividade"],
  description:"Ensaio de divulgação que investiga diferentes sentidos físicos do tempo e a relação com entropia e experiência humana.",
  publisher:"org_objetiva",isbn:"9788547000561",pages:192,publish:"2018-01-01",
  url:"https://www.companhiadasletras.com.br/livro/9788547000561/a-ordem-do-tempo",
  img:"https://amancheia.com.br/42539-large_default/a-ordem-do-tempo-carlo-rovelli.jpg",
  imgCredit:"Objetiva / catálogo A Mão Cheia",extra:"Tradução: Silvana Cobucci."
 },
 {
  key:"universo_elegante_greene",slug:"o-universo-elegante-brian-greene",name:"O universo elegante",original:"The Elegant Universe",
  person:"person_brian_greene",country:"Estados Unidos",lang:"Inglês",year:"1999",categories:["science"] as ReadingWork["categories"],themes:["Relatividade","Mecânica quântica","Teoria de cordas","Unificação"],
  description:"Introdução à relatividade e à mecânica quântica com exposição de hipóteses da teoria de cordas e seus desafios experimentais.",
  publisher:"org_companhia_das_letras",isbn:"9788535900989",pages:480,publish:"2001-03-29",
  url:"https://www.companhiadasletras.com.br/livro/9788535900989/o-universo-elegante",
  img:"https://loja.healing.com.br/wp-content/uploads/2020/10/O-Universo-Elegante.jpg",
  imgCredit:"Companhia das Letras / catálogo Healing",extra:"Tradução: José Viegas Filho. Impressão sob demanda indicada pela editora."
 },
 {
  key:"cosmos_carl_sagan",slug:"cosmos-carl-sagan-livro",name:"Cosmos",original:"Cosmos",
  person:"person_carl_sagan",country:"Estados Unidos",lang:"Inglês",year:"1980",categories:["science"] as ReadingWork["categories"],themes:["História da ciência","Astronomia","Método científico","Evolução do conhecimento"],
  description:"Panorama da história do conhecimento científico, da astronomia, da vida e do lugar da humanidade no universo.",
  publisher:"org_companhia_das_letras",isbn:"9788535929881",pages:488,publish:"2017-01-01",
  url:"https://www.companhiadasletras.com.br/9788535929881-cosmos-2330/p",
  img:"https://livrariascuritiba.vteximg.com.br/arquivos/ids/1747069-1000-1000/LV420730.jpg?v=638430796756100000",
  imgCredit:"Companhia das Letras / catálogo Livrarias Curitiba",extra:"Tradução: Paulo Geiger. Texto histórico: alguns dados científicos foram atualizados por pesquisas posteriores."
 },
 {
  key:"andar_bebado_mlodinow",slug:"o-andar-do-bebado-leonard-mlodinow",name:"O andar do bêbado",original:"The Drunkard's Walk",
  person:"person_leonard_mlodinow",country:"Estados Unidos",lang:"Inglês",year:"2008",categories:["science"] as ReadingWork["categories"],themes:["Probabilidade","Acaso","Estatística","Pensamento crítico"],
  description:"Explica como a aleatoriedade e a probabilidade influenciam julgamentos e o uso de evidências, base útil para uma formação científica.",
  publisher:"org_zahar",isbn:"9788537818107",pages:324,publish:"2018-01-01",
  url:"https://www.companhiadasletras.com.br/9788537818107-o-andar-do-bebado-3478/p",
  img:"https://americanas.vtexassets.com/arquivos/ids/30560779/1230296492_1_xlarge.jpg?v=638794239599400000",
  imgCredit:"Zahar / catálogo Americanas",extra:"Tradução: Diego Alfaro. O tema principal é probabilidade, não uma introdução completa à física."
 },
 {
  key:"buracos_negros_hawking",slug:"buracos-negros-stephen-hawking",name:"Buracos negros",original:"Black Holes: The Reith Lectures",
  person:"person_stephen_hawking",country:"Reino Unido",lang:"Inglês",year:"2016",categories:["science"] as ReadingWork["categories"],themes:["Buracos negros","Horizonte de eventos","Relatividade","Cosmologia"],
  description:"Duas palestras de Stephen Hawking que apresentam questões centrais sobre buracos negros, espaço-tempo e informação.",
  publisher:"org_intrinseca",isbn:"9788551000984",pages:64,publish:"2017-01-06",
  url:"https://www.intrinseca.com.br/buracosnegros/",
  img:"",
  imgCredit:"Intrínseca",extra:"Edição brasileira das palestras Reith Lectures, com notas explicativas."
 },
] as const;

export const physicsBuyingWorks: ReadingWork[] = books.map(book=>({
  id:`read_work_${book.key}`,contentType:"reading-work",schemaVersion:1,slug:book.slug,
  aliases:[],originalTitle:book.original,titleBr:book.name,workType:"book",format:"book",
  originCountries:[book.country],originalLanguages:[book.lang],publicationStart:book.year,
  credits:[{personId:book.person,roles:["author"]}],organizationRelationships:[],
  publicationStatus:"completed",categories:["science"],genres:["Divulgação científica"],
  themes:[...book.themes],demographics:["general"],shortDescription:book.description,
  seriesMemberships:[],relatedWorks:[],adaptations:[],
  sources:[{title:`${book.name} — ficha editorial`,url:book.url}],
  status:"published",publishedAt:checkedAt,createdAt:checkedAt,updatedAt:checkedAt,
}));

export const physicsBuyingEditions: ReadingEdition[] = books.map(book=>({
  id:`read_edition_${book.key}_br`,workId:`read_work_${book.key}`,
  title:`${book.name} — edição brasileira ISBN ${book.isbn}`,publisherId:book.publisher,
  country:"Brasil",language:"Português",medium:"paperback",publicationDate:book.publish,
  isbn13:book.isbn,pageCount:book.pages,
  ...(book.img ? {cover:{src:book.img,alt:`Capa da edição brasileira de ${book.name} (ISBN ${book.isbn})`,
    sourceUrl:book.url,credit:book.imgCredit,rights:"permission-pending" as const,width:600,height:900}} : {}),
  translationCredits:[],availabilityStatus:"unknown",status:"published",
  sources:[{title:`${book.name} — ficha da editora; ${book.extra}`,url:book.url}],
  createdAt:checkedAt,updatedAt:checkedAt,
}));
