# FUT-7 — Portal de futebol

Portal estático em HTML, CSS e JavaScript, com interface em português, inglês, espanhol e italiano. O frontend pode ser publicado no GitHub Pages.

## O que está incluído
- Layout responsivo para telemóvel e computador.
- Pesquisa e filtro por categoria.
- Alternância entre tema claro e escuro.
- Interface traduzida em quatro idiomas.
- Cartões de notícia com título, resumo, fonte, data e link para a publicação original.
- Atualizador RSS executado por GitHub Actions a cada três horas.

## Publicar no GitHub Pages
1. Crie um repositório público chamado `fut-7`.
2. Envie todos os ficheiros desta pasta para a raiz do repositório, incluindo `.github`.
3. Abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/ (root)`, depois carregue em **Save**.
6. Aguarde a publicação. O endereço será semelhante a `https://SEU-USUARIO.github.io/fut-7/`.

## Ativar notícias RSS
O atualizador só importa fontes com `enabled: true` e um endereço RSS real. Os endereços em `sources.json` estão desativados de propósito: páginas de notícias não são necessariamente feeds RSS. Confirme o URL RSS nas páginas oficiais de cada entidade e só então:
1. Edite `sources.json`.
2. Substitua `feed` pelo endereço RSS oficial confirmado.
3. Altere `enabled` para `true`.
4. Faça commit e push.
5. No GitHub, abra **Actions → Atualizar notícias → Run workflow** para testar.

O fluxo automático corre a cada três horas. Pode também ser executado manualmente.

## Limitações importantes
- GitHub Pages hospeda apenas ficheiros estáticos; não executa um servidor Node.js nem protege segredos de API.
- Este projeto não inventa notícias e não faz scraping de páginas HTML. Se uma entidade não disponibilizar RSS/API oficial, adicione a notícia manualmente em `data/news.json` com a fonte e o link originais.
- O conteúdo e as imagens pertencem aos respetivos editores. O FUT-7 apresenta resumos curtos e liga à publicação original; respeite os termos de cada fonte e não copie artigos completos.
- Os feeds podem mudar ou limitar acesso. A importação automática depende de cada feed continuar ativo.
- O tradutor traduz a interface. Os títulos e resumos das fontes são apresentados no idioma original; tradução automática de conteúdo exigiria um serviço externo e uma chave protegida num backend.
- O email `contacto@exemplo.com` é um marcador. Substitua-o pelo contacto que pretende divulgar.

## Formato de `data/news.json`
Cada item usa:
```json
{
  "title": "Título da notícia",
  "summary": "Resumo curto escrito com as próprias palavras.",
  "source": "Nome da fonte oficial",
  "date": "2026-11-24T10:00:00Z",
  "url": "https://endereco-oficial-da-noticia",
  "category": "official",
  "image": ""
}
```
Categorias suportadas: `official`, `transfers`, `competitions`.
