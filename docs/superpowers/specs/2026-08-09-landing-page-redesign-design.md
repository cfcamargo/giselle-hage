# Reformulação da landing page da Dra. Giselle Hage

## Visão geral

O site será reconstruído como uma landing page premium para a Dra. Giselle Hage, profissional de harmonização orofacial em Ponta Porã–MS. A nova experiência deve comunicar autoridade clínica em primeiro lugar, equilibrada por sofisticação e acolhimento, e conduzir visitantes ao contato pelo WhatsApp.

A identidade atual não será preservada além do nome e da logo. As imagens existentes serão usadas na apresentação inicial; a arquitetura visual deverá permitir substituí-las por fotografias profissionais posteriormente sem refazer o layout.

## Objetivos

- Aumentar a percepção de autoridade, confiança e valor do atendimento.
- Transformar o site em uma experiência contemporânea e memorável por meio de motion design.
- Reduzir o conteúdo e o número de páginas, concentrando a jornada em uma landing page direta.
- Converter visitantes em conversas no WhatsApp para avaliação e agendamento.
- Fortalecer o SEO local em Ponta Porã, cidades vizinhas e na região de fronteira com o Paraguai.
- Atender tanto pacientes de 25–35 anos interessados em prevenção quanto pacientes de 35–55 anos interessados em rejuvenescimento.

## Escopo

### Incluído

- Redesign integral da página inicial como landing page.
- Nova identidade visual baseada na direção “clínica editorial”.
- Abertura animada da marca.
- Motion design de componentes e sequências ligadas ao scroll.
- Destaques para Botox, preenchimento e peeling.
- Autoridade profissional, resultados, depoimentos, apresentação pessoal, localização e FAQ.
- CTAs recorrentes e botão persistente para WhatsApp.
- SEO técnico, local e on-page.
- Redirecionamentos das páginas antigas de serviços.
- Experiências adaptadas para desktop, tablet, celular e redução de movimento.

### Fora do escopo nesta etapa

- Versão em espanhol.
- Sistema de agendamento próprio.
- Blog ou CMS.
- Novas sessões fotográficas.
- Páginas individuais extensas para cada procedimento.

## Direção de marca

A percepção prioritária é autoridade clínica. Sofisticação e beleza natural sustentam essa autoridade, sem excessos visuais ou promessas estéticas irreais.

### Linguagem visual

- Fundo marfim quente no lugar de branco puro.
- Ameixa ou vinho profundo como cor institucional.
- Champagne fosco como detalhe, sem aparência metálica chamativa.
- Tipografia serifada expressiva para títulos e sans-serif legível para conteúdo clínico.
- Composições assimétricas, respiro amplo e fotografias com recortes editoriais.
- Linhas e formas sutis inspiradas em proporção, contorno facial e precisão clínica.
- Ausência de clichês visuais genéricos de beleza, excesso de gradientes, vidro ou estética de startup.

## Arquitetura da landing page

1. **Abertura da marca:** a logo se constrói sobre um fundo elegante e uma máscara revela a página. A sequência deve durar aproximadamente dois segundos na primeira exibição da sessão e ter uma versão abreviada nas demais exibições.
2. **Hero:** fotografia da Dra. Giselle, proposta de valor, localização e CTA “Agende sua avaliação”.
3. **Autoridade e confiança:** formação, CRO-MS 4589, mais de dez anos de experiência e atendimento individualizado.
4. **Tratamentos protagonistas:** Botox, preenchimento e peeling, cada um com benefício objetivo, explicação curta e CTA.
5. **Filosofia de atendimento:** prevenção, gerenciamento do envelhecimento e respeito aos traços naturais.
6. **Resultados e prova social:** imagens disponíveis e depoimentos, com indicação clara de que resultados variam entre pacientes.
7. **Sobre a especialista:** apresentação profissional e humana, curta e verificável.
8. **Localização e alcance regional:** endereço em Ponta Porã e atendimento a cidades vizinhas e à região de fronteira com o Paraguai.
9. **FAQ:** dúvidas relevantes à decisão do paciente e às buscas orgânicas.
10. **Fechamento:** chamada final para avaliação, contato e localização.

A navegação será compacta e usará âncoras na própria página. O WhatsApp ficará acessível de forma persistente.

## Conteúdo e tom de voz

A mensagem central será: “Harmonização facial com precisão, naturalidade e cuidado individual.” A redação será direta, segura e acolhedora. Não haverá promessas de resultado, garantias, superlativos médicos não comprovados ou linguagem que explore inseguranças.

Os dois grupos de público serão contemplados dentro da mesma narrativa:

- prevenção e valorização dos traços naturais;
- gerenciamento do envelhecimento e rejuvenescimento com naturalidade.

Os três procedimentos prioritários terão textos enxutos. Os tratamentos complementares poderão ser mencionados em uma lista secundária, sem competir com Botox, preenchimento e peeling.

## Conversão pelo WhatsApp

O CTA principal será “Agende sua avaliação”. Todos os CTAs usarão o número já existente no projeto e abrirão a seguinte mensagem preenchida:

> Olá, Dra. Giselle! Conheci seu site e gostaria de agendar uma avaliação para entender qual tratamento é mais indicado para mim.

Os CTAs aparecerão no hero, após os tratamentos, próximos às provas sociais, após o FAQ e no fechamento. Um botão persistente estará disponível sem cobrir conteúdo ou controles. Os cliques deverão emitir um evento único e identificável para futura integração analítica, incluindo a seção de origem.

## Motion design

### Responsabilidades técnicas

- **GSAP e ScrollTrigger:** abertura da marca, timelines, revelações de texto, máscaras, parallax e sequências vinculadas ao scroll.
- **Motion for Vue:** menus, botões, cards, microinterações e mudanças de estado.
- **CSS:** transições simples e estados que não justificam dependências de animação.

### Comportamentos

- Hero revelado em camadas após a abertura.
- Títulos revelados por linha conforme entram na viewport.
- Fotografias com parallax leve e recortes que se expandem durante o scroll.
- Tratamentos apresentados em composição editorial responsiva.
- Credenciais e números com entrada precisa e discreta.
- Resultados com comparação interativa somente quando os assets forem pares compatíveis.
- CTA persistente com feedback sutil, sem pulsação contínua.
- Transições visuais que conectam as seções sem bloquear leitura ou navegação.

### Restrições

- A animação não deve esconder permanentemente conteúdo indexável.
- A página deve permanecer utilizável se o JavaScript de motion falhar.
- No celular, timelines e parallax serão simplificados para manter fluidez.
- `prefers-reduced-motion: reduce` desativará movimentos não essenciais e exibirá estados finais imediatamente.
- Animações e listeners serão desmontados ao sair dos componentes para evitar duplicação.
- Nenhuma animação poderá atrasar o acesso ao CTA por mais de aproximadamente dois segundos.

## SEO

### Público e geografia

O conteúdo será somente em português nesta etapa. A página terá foco principal em Ponta Porã–MS e alcance complementar para cidades vizinhas e para pacientes da região de fronteira com Pedro Juan Caballero e o Paraguai. Não serão criadas páginas locais artificiais ou textos repetitivos.

### Temas prioritários

- harmonização facial em Ponta Porã;
- Botox em Ponta Porã;
- preenchimento facial em Ponta Porã;
- peeling em Ponta Porã;
- rejuvenescimento e prevenção;
- atendimento de harmonização facial na região de fronteira.

### Requisitos técnicos e on-page

- Um `h1` único e hierarquia semântica consistente.
- Conteúdo essencial renderizado no HTML pelo Nuxt.
- Título, descrição, canonical e Open Graph específicos.
- Sitemap e `robots.txt` coerentes com a URL final.
- Dados estruturados compatíveis com o negócio e apenas com informações verificáveis.
- FAQ visível no HTML; markup estruturado somente se estiver de acordo com as diretrizes vigentes no momento da implementação.
- Textos alternativos descritivos para imagens informativas e `alt` vazio para imagens decorativas.
- URLs antigas redirecionadas permanentemente para a home com fragmento relevante quando houver correspondência clara; URLs sem correspondência irão para a seção de tratamentos.
- Preservação de uma estrutura extensível para um futuro idioma espanhol, sem adicionar `hreflang` antes de existir uma versão traduzida.

## Arquitetura técnica

O projeto continuará em Nuxt 3, Vue e Tailwind. A landing page será dividida em componentes com responsabilidade única: intro, cabeçalho, hero, credenciais, tratamentos, filosofia, resultados, sobre, FAQ, localização, fechamento e CTA persistente.

Dados estáticos de tratamentos, credenciais, perguntas e links serão centralizados em estruturas tipadas. Composables separarão comportamento transversal, como WhatsApp, preferência de movimento e registro de animações. GSAP, ScrollTrigger e Motion for Vue serão inicializados apenas no cliente.

As páginas antigas deixarão de fazer parte da navegação. Os redirecionamentos serão configurados na camada do Nuxt/servidor, de acordo com o ambiente de hospedagem identificado durante a implementação.

## Desempenho e resiliência

- Priorizar a imagem do hero e adiar imagens abaixo da dobra.
- Fornecer dimensões ou proporções para evitar mudanças de layout.
- Otimizar formatos e tamanhos por viewport com o módulo de imagens.
- Reduzir o número de fontes, pesos e recursos bloqueantes.
- Carregar bibliotecas de motion somente no cliente e dividir código quando aplicável.
- Não depender da conclusão do carregamento de todas as imagens para encerrar a intro.
- Manter conteúdo, navegação por âncora e WhatsApp disponíveis sem animação.
- Evitar efeitos de scroll pesado em dispositivos de menor capacidade.

## Acessibilidade

- Contraste adequado entre texto, fundo e controles.
- Navegação completa por teclado e foco visível.
- Botões e links com nomes acessíveis.
- Menu mobile com controle de foco e fechamento por Escape.
- Regiões e títulos semânticos.
- Respeito a redução de movimento.
- Controles de resultados acessíveis por teclado quando houver comparação interativa.

## Validação e critérios de aceite

- O build de produção termina sem erros.
- A landing funciona nos principais tamanhos de celular, tablet e desktop.
- Não há overflow horizontal, travamentos ou timelines duplicadas.
- O conteúdo essencial e os CTAs estão acessíveis sem motion.
- A abertura completa aparece no máximo uma vez por sessão e possui saída segura.
- Todos os CTAs abrem o número correto com a mensagem definida e preservam a identificação da seção de origem para analytics.
- A navegação por teclado, o foco e a redução de movimento funcionam.
- Metadados, canonical, sitemap, schema e redirecionamentos são validados.
- As imagens têm dimensões, carregamento e textos alternativos apropriados.
- As metas de desempenho serão avaliadas em build de produção, priorizando LCP, CLS e INP sem sacrificar a direção visual.
- Textos sobre formação, registro, experiência, localização e procedimentos serão conferidos com a cliente antes da publicação definitiva.

## Migração e publicação

O redesign será feito sobre a base atual, preservando somente conteúdo e assets úteis. Antes da publicação, será criada uma relação explícita entre cada rota antiga e seu destino. A landing substituirá a home atual apenas após a validação de responsividade, acessibilidade, SEO, links e desempenho.

O primeiro lançamento poderá usar as imagens atuais como apresentação comercial. A troca por novas fotos deverá exigir apenas substituição de assets e ajustes de enquadramento, não mudanças estruturais.
