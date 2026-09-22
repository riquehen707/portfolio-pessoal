import { CreatorSchema, type Creator } from "./creatorSchema";

const checked = "2026-08-24";
const author = (id:string,name:string,region:string,url:string,summary?:string):Creator => CreatorSchema.parse({
  id:`person_${id}`,slug:id.replaceAll("_","-"),name,kind:"person",status:"published",countryOrRegion:region,
  occupations:["Autoria de ficção científica"],summary:summary ?? `Pessoa autora de ficção científica com obra cadastrada no acervo.`,workIds:[],
  sources:[{title:`${name} — fonte editorial`,url,kind:"primary"}],createdAt:checked,updatedAt:checked,
});

export const scienceFictionAuthors:Creator[] = [
  author("h_g_wells","H. G. Wells","Reino Unido","https://www.britannica.com/biography/H-G-Wells","Escritor inglês cuja ficção científica antecipou formas modernas de especulação social, tecnológica e temporal."),
  author("isaac_asimov","Isaac Asimov","Rússia / Estados Unidos","https://aleph.com.br/products/fundacao","Escritor e divulgador científico cuja obra articulou robôs, impérios galácticos e modelos de previsão histórica."),
  author("arthur_c_clarke","Arthur C. Clarke","Reino Unido / Sri Lanka","https://www.britannica.com/biography/Arthur-C-Clarke","Escritor britânico de ficção científica interessado em exploração espacial, tecnologia e escalas cósmicas."),
  author("philip_k_dick","Philip K. Dick","Estados Unidos","https://www.britannica.com/biography/Philip-K-Dick","Escritor norte-americano que investigou identidade, realidade mediada e poder corporativo em futuros instáveis."),
  author("stanislaw_lem","Stanisław Lem","Polônia","https://aleph.com.br/products/solaris","Escritor polonês de ficção científica conhecido por confrontar ciência humana, linguagem e formas de inteligência incomensuráveis."),
  author("ursula_k_le_guin","Ursula K. Le Guin","Estados Unidos","https://aleph.com.br/products/a-mao-esquerda-da-escuridao","Escritora norte-americana cuja ficção especulativa aproximou antropologia, política, gênero e imaginação social."),
  author("frank_herbert","Frank Herbert","Estados Unidos","https://aleph.com.br/products/duna-1","Escritor norte-americano cuja obra combinou ecologia, religião, poder e escala planetária."),
  author("margaret_atwood","Margaret Atwood","Canadá","https://www.penguinrandomhouse.com/books/61256/the-handmaids-tale-by-margaret-atwood/","Escritora canadense que usa futuros próximos e regimes autoritários para examinar corpo, linguagem e poder."),
  author("kazuo_ishiguro","Kazuo Ishiguro","Reino Unido","https://www.faber.co.uk/product/9780571258093-never-let-me-go/","Escritor britânico cuja ficção explora memória, cuidado e as consequências íntimas da biotecnologia."),
  author("ted_chiang","Ted Chiang","Estados Unidos","https://www.penguinrandomhouse.com/books/549738/stories-of-your-life-and-others-by-ted-chiang/","Contista norte-americano conhecido por narrativas rigorosas sobre linguagem, tempo, inteligência e responsabilidade técnica."),
  author("samuel_r_delany","Samuel R. Delany","Estados Unidos","https://aleph.com.br/products/nova","Escritor e crítico norte-americano cuja obra renovou a space opera por meio de linguagem, sexualidade e classe."),
  author("suzette_haden_elgin","Suzette Haden Elgin","Estados Unidos","https://aleph.com.br/products/lingua-nativa","Linguista e escritora norte-americana que fez da linguagem uma ferramenta central de ficção científica feminista."),
  author("thea_von_harbou","Thea von Harbou","Alemanha","https://aleph.com.br/products/metropolis","Escritora e roteirista alemã, autora do romance que acompanha e amplia o universo de Metrópolis."),
  author("joanna_russ","Joanna Russ","Estados Unidos","https://www.penguinrandomhouse.com/books/65717/the-female-man-by-joanna-russ/","Escritora e crítica norte-americana de ficção científica feminista."),
  author("alastair_reynolds","Alastair Reynolds","Reino Unido","https://www.hachettebookgroup.com/titles/alastair-reynolds/revelation-space/9780316462440/"),
  author("james_s_a_corey","James S. A. Corey","Estados Unidos","https://www.hachettebookgroup.com/titles/james-s-a-corey/leviathan-wakes/9780316129084/","Pseudônimo coletivo de Daniel Abraham e Ty Franck, autores da série The Expanse."),
  author("adrian_tchaikovsky","Adrian Tchaikovsky","Reino Unido","https://www.hachettebookgroup.com/titles/adrian-tchaikovsky/children-of-time/9780316452502/"),
  author("peter_watts","Peter Watts","Canadá","https://us.macmillan.com/books/9781250237484/blindsight/"),
  author("ray_nayler","Ray Nayler","Estados Unidos","https://us.macmillan.com/books/9780374605964/themountaininthesea/"),
  author("ann_leckie","Ann Leckie","Estados Unidos","https://www.hachettebookgroup.com/titles/ann-leckie/ancillary-justice/9780316246637/"),
  author("william_gibson","William Gibson","Canadá / Estados Unidos","https://www.penguinrandomhouse.com/books/538861/neuromancer-by-william-gibson/"),
  author("cixin_liu","Cixin Liu","China","https://us.macmillan.com/books/9780765382030/thethreebodyproblem/"),
  author("arkady_strugatsky","Arkady Strugatsky","União Soviética","https://www.chicagoreviewpress.com/roadside-picnic-products-9781613743416.php"),
  author("boris_strugatsky","Boris Strugatsky","União Soviética","https://www.chicagoreviewpress.com/roadside-picnic-products-9781613743416.php"),
];
