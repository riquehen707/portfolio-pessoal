# Perfil editorial de estúdio de animação

Use este modelo para criar ou revisar páginas permanentes de estúdios de animação. Ele complementa a [arquitetura do site](../../architecture/site-architecture.md) e o [sistema editorial](../../content/README.md); não substitui suas regras gerais. O `global-standards.md` citado em briefings ainda não existe.

A página deve apresentar uma organização criativa com clareza e personalidade, sem parecer wiki, página corporativa, streaming, fandom ou landing page. Preserve o design system e aplique divulgação progressiva: primeiro identidade e obras; aprofundamentos vêm depois, quando sustentados por conteúdo e links reais.

## Fluxo obrigatório

1. **Audite antes de criar.** Procure a organização por ID, slug, aliases, nomes atuais e anteriores. Confirme natureza jurídica/editorial, localização, fundação, fundadores, situação, relações empresariais, site, fontes e ativos. Diferencie estúdio, produtora, coprodutora, distribuidora, controladora, marca, plataforma e prestadora de serviços.
2. **Reutilize as entidades centrais.** Organizações ficam em `src/content/organizations/`; pessoas em `src/content/creators/`; filmes em `src/content/movies/`; outras obras nos domínios já implementados. Não copie dados para a página. O schema atual de organização é mínimo; dados ainda não aceitos devem permanecer na fonte adequada ou ser registrados como lacuna, não em um segundo cadastro informal.
3. **Relacione obras por ID e papel real.** Em filmes, use `organizationRelationships`; produção, coprodução, animação, distribuição, licenciamento e serviços não são equivalentes. Reutilize obras existentes e cadastre ausentes antes de exibi-las. Não atribua ao estúdio obras de outra empresa do conglomerado.
4. **Gere a filmografia.** Para filmes, use `OrganizationWorks`/`getOrganizationMovies` com papéis explícitos. Não mantenha um array completo na página. Obras animadas ainda usam vocabulário próprio em `animationWorks`; preserve-o até existir migração documentada e não finja que `OrganizationWorks` cobre esse domínio.
5. **Publique somente conteúdo suficiente.** Registro incompleto permanece `draft`, sem página pública, sitemap ou indexação. Conteúdos relacionados devem existir de fato.

## Núcleos da página

Mantenha estes seis núcleos; ajuste a composição, não a função.

### 1. Hero

Breadcrumb visual e `BreadcrumbJsonLd`, nome, descrição curta, localização, ano de fundação, uma ação principal para explorar obras e imagem autorizada ou composição abstrata original. Deve funcionar sem imagem. Evite título desproporcional, várias chamadas e excesso de metadados.

### 2. Sobre o estúdio

Um ou dois parágrafos, pessoas centrais e três fatos essenciais. Sintetize história, identidade e processo aqui quando não justificarem módulo próprio. Não use tabela institucional extensa nem transforme informação escassa em narrativa artificial.

### 3. Filmografia

Mostre uma amostra automática das relações centrais. Cards devem se limitar a imagem, título, ano, direção/crédito principal e link; o contexto já informa o nome do estúdio. Use acesso à filmografia completa apenas quando houver volume e rota reais. Não adicione filtros sem necessidade comprovada.

### 4. Por onde começar

Normalmente três caminhos definidos pela intenção do visitante, cada um com uma obra, justificativa curta e continuação. Adapte os caminhos ao estúdio; não use categorias fixas, ranking ou repetição da filmografia.

### 5. Conteúdos relacionados

Poucos artigos, curadorias, perfis ou análises existentes e realmente relevantes. Omitir é melhor que produzir bloco vazio ou link especulativo.

### 6. Fontes e créditos

Liste compactamente fontes principais e, para cada ativo usado, origem, crédito, texto alternativo e situação de direitos. Imagem promocional não é automaticamente liberada para uso comercial; a composição deve continuar íntegra sem ela.

## Módulos condicionais

Inclua apenas quando houver material suficiente e benefício editorial: história detalhada; técnicas e processo; pessoas; fases; séries e curtas; coproduções; projetos interativos; prêmios relevantes; mudanças empresariais. Antes, verifique se dois parágrafos em “Sobre” ou uma página relacionada resolvem melhor.

## Direção visual e experiência

Preserve `Header`, `Footer`, tipografia, containers, grid, tokens, espaçamentos e comportamento responsivo globais. Personalidade pode vir de imagem principal, cor de destaque controlada, formas abstratas originais, seleção de obras, pequenos detalhes e ritmo. Não crie outro design system, copie propriedade intelectual nem gere imagem “no estilo” do estúdio ou de seus artistas.

Use linguagem jovem-adulta, próxima e precisa. Garanta ordem editorial equivalente no mobile, densidade reduzida sem perda essencial, foco visível, teclado, contraste, alvos claros, conteúdo fora do hover, `prefers-reduced-motion` e fallback com/sem capa. O conteúdo principal e a filmografia precisam existir no HTML renderizado pelo servidor.

## SEO, descoberta e monetização

Configure metadata, título, descrição, canonical, Open Graph, breadcrumbs, robots, sitemap, busca/navegação e JSON-LD `Organization` somente com dados visíveis e confirmados. Não invente notas ou avaliações. Confira separadamente middleware, `routes`, robots, sitemap e busca global, conforme `site-architecture.md`.

Ofertas, afiliados, livros de arte, edições físicas e produtos oficiais permanecem fora dos dados institucionais e das obras. Podem aparecer discretamente por relação própria, com procedência e aviso aplicáveis; a página deve ser completa sem monetização.

## Validação e entrega

Antes de concluir, verifique:

- identidade, aliases, fundadores, situação e relações empresariais;
- papéis em cada obra, incluindo coprodução, animação parcial e serviços;
- filmografia automática e ausência de lista duplicada;
- cards com e sem imagem, links internos e HTML sem JavaScript;
- mobile e desktop, teclado, contraste e movimento reduzido;
- metadata, canonical, JSON-LD, robots, sitemap e descoberta;
- `npm run audit:content`, TypeScript, lint, build e `git diff --check`, na proporção do impacto.

No relatório, separe fatos confirmados, decisões editoriais, ativos/direitos pendentes, arquivos alterados, testes e riscos. Problemas recorrentes encontrados em páginas reais devem corrigir este modelo somente quando forem reutilizáveis por outros estúdios; necessidades exclusivas permanecem na implementação específica.
