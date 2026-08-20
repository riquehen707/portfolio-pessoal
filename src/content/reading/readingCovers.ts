import type { ReadingEdition } from "./readingSchema";

type ReadingCover = NonNullable<ReadingEdition["cover"]>;

const cover = (src: string, alt: string, sourceUrl: string, credit: string, width: number, height: number): ReadingCover => ({
  src, alt, sourceUrl, credit, width, height, rights: "permission-pending",
});

export const readingEditionCovers: Record<string, ReadingCover> = {
  read_edition_burnout_society_vozes: cover("/images/reading/sociedade-do-cansaco-vozes.png", "Capa da edição brasileira de Sociedade do Cansaço publicada pela Editora Vozes", "https://books.google.com/books/about/Sociedade_do_cansa%C3%A7o.html?id=IYWZCgAAQBAJ", "Editora Vozes via Google Books", 300, 513),
  read_edition_carmilla_darkside: cover("/images/reading/carmilla-darkside.webp", "Capa da edição brasileira de Carmilla publicada pela DarkSide Books", "https://www.darksidebooks.com.br/carmilla--brinde-exclusivo-43665/p", "DarkSide Books", 448, 671),
  read_edition_frankenstein_darkside: cover("/images/reading/frankenstein-darkside.webp", "Capa da edição brasileira de Frankenstein publicada pela DarkSide Books", "https://www.darksidebooks.com.br/frankenstein/p", "DarkSide Books", 215, 322),
  read_edition_rosemary_darkside: cover("/images/reading/bebe-rosemary-darkside.webp", "Capa da edição brasileira de O Bebê de Rosemary publicada pela DarkSide Books", "https://www.darksidebooks.com.br/o-bebe-de-rosemary--brindes-exclusivos/p", "DarkSide Books", 215, 322),
  read_edition_mexican_gothic_darkside: cover("/images/reading/gotico-mexicano-darkside.webp", "Capa da edição brasileira de Gótico Mexicano publicada pela DarkSide Books", "https://www.darksidebooks.com.br/gotico-mexicano/p", "DarkSide Books", 215, 322),
  read_edition_tender_flesh_darkside: cover("/images/reading/saboroso-cadaver-darkside.webp", "Capa da edição brasileira de Saboroso Cadáver publicada pela DarkSide Books", "https://www.darksidebooks.com.br/saboroso-cadaver/p", "DarkSide Books", 215, 322),
  read_edition_salem_suma: cover("/images/reading/salem-suma.webp", "Capa da edição brasileira de Salem publicada pela Suma", "https://www.companhiadasletras.com.br/livro/9788581050454/salem", "Suma / Companhia das Letras", 453, 650),
  read_edition_hill_house_alfaguara: cover("/images/reading/assombracao-casa-colina.webp", "Capa da edição brasileira de A Assombração da Casa da Colina publicada pela Alfaguara", "https://www.companhiadasletras.com.br/livro/9788556521149/a-assombracao-da-casa-da-colina-nova-edicao", "Alfaguara / Companhia das Letras", 416, 650),
  read_edition_always_castle_alfaguara: cover("/images/reading/sempre-vivemos-castelo.webp", "Capa da edição brasileira de Sempre Vivemos no Castelo publicada pela Alfaguara", "https://www.companhiadasletras.com.br/livro/9788556521422/sempre-vivemos-no-castelo-nova-edicao", "Alfaguara / Companhia das Letras", 416, 650),
  read_edition_shining_suma: cover("/images/reading/o-iluminado-suma.webp", "Capa da edição brasileira de O Iluminado publicada pela Suma", "https://www.companhiadasletras.com.br/livro/9788556510464/o-iluminado", "Suma / Companhia das Letras", 438, 650),
  read_edition_beloved_companhia: cover("/images/reading/amada-companhia.webp", "Capa da edição brasileira de Amada publicada pela Companhia das Letras", "https://www.companhiadasletras.com.br/livro/9788535910698/amada", "Companhia das Letras", 433, 650),
  read_edition_cursed_bunny_alfaguara: cover("/images/reading/coelho-maldito.webp", "Capa da edição brasileira de Coelho Maldito publicada pela Alfaguara", "https://www.companhiadasletras.com.br/livro/9788556521996/coelho-maldito", "Alfaguara / Companhia das Letras", 420, 650),
  read_edition_secret_dinner_companhia: cover("/images/reading/jantar-secreto.webp", "Capa da edição brasileira de Jantar Secreto publicada pela Companhia das Letras", "https://www.companhiadasletras.com.br/livro/9788535928358/jantar-secreto", "Companhia das Letras", 434, 650),
  read_edition_our_share_night_intrinseca: cover("/images/reading/nossa-parte-noite.webp", "Imagem da edição brasileira de Nossa Parte de Noite publicada pela Intrínseca", "https://loja.intrinseca.com.br/nossa-parte-de-noite/", "Intrínseca", 265, 265),
  read_edition_it_suma: cover("/images/reading/it-a-coisa.webp", "Capa da edição brasileira de It: A Coisa publicada pela Suma", "https://www.companhiadasletras.com.br/livro/9788560280940/it-a-coisa", "Suma / Companhia das Letras", 452, 650),
  read_edition_institute_suma: cover("/images/reading/o-instituto.webp", "Capa da edição brasileira de O Instituto publicada pela Suma", "https://n.companhiadasletras.com.br/livro/9788556510853/o-instituto", "Suma / Companhia das Letras", 427, 650),
  read_edition_something_wicked_record: cover("/images/reading/algo-sinistro.webp", "Capa da edição brasileira de Algo Sinistro Vem por Aí publicada pelo Grupo Editorial Record", "https://www.record.com.br/products/algo-sinistro-vem-por-ai", "Grupo Editorial Record", 200, 297),
  read_edition_imaginary_friend_record: cover("/images/reading/amigo-imaginario.webp", "Capa da edição brasileira de Amigo Imaginário publicada pelo Grupo Editorial Record", "https://www.record.com.br/products/amigo-imaginario/", "Grupo Editorial Record", 200, 293),
  read_edition_chalk_man_intrinseca: cover("/images/reading/homem-de-giz.webp", "Imagem da edição brasileira de O Homem de Giz publicada pela Intrínseca", "https://loja.intrinseca.com.br/o-homem-de-giz/", "Intrínseca", 265, 265),
  read_edition_chalk_pits_intrinseca: cover("/images/reading/o-que-aconteceu-annie.webp", "Imagem da edição brasileira de O Que Aconteceu com Annie publicada pela Intrínseca", "https://intrinseca.com.br/livro/o-que-aconteceu-com-annie/", "Intrínseca", 265, 265),
  read_edition_vampeerz_jbc_1: cover("/images/reading/vampeerz-01.webp", "Capa de Vampeerz volume 1 publicado pela Editora JBC", "https://editorajbc.com.br/2025/03/14/lancamento-jbc-vampeerz/", "Editora JBC", 720, 1008),
  read_edition_infidel_pn: cover("/images/reading/infiel.webp", "Imagem da edição brasileira de Infiel publicada pela Pipoca & Nanquim", "https://pipocaenanquim.com.br/infiel.html", "Pipoca & Nanquim", 265, 265),
  read_edition_propria_carne_pn: cover("/images/reading/a-propria-carne.webp", "Imagem da edição brasileira de A Própria Carne publicada pela Pipoca & Nanquim", "https://pipocaenanquim.com.br/a-propria-carne-escrito-com-sangue.html", "Pipoca & Nanquim", 265, 265),
  read_edition_blue_box_jbc_1: cover("/images/reading/blue-box-01.webp", "Capa de Blue Box volume 1 publicado pela Editora JBC", "https://editorajbc.com.br/mangas/colecao/blue-box/vol/blue-box-01/", "Editora JBC", 720, 1091),
};
