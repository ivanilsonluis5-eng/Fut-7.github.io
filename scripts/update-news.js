const fs = require("fs");
const Parser = require("rss-parser");

const parser = new Parser();

const sources = JSON.parse(
  fs.readFileSync("sources.json", "utf8")
);

const existing = JSON.parse(
  fs.readFileSync("data/news.json", "utf8")
);

async function updateNews() {
  const news = [];

  for (const source of sources.filter(s => s.enabled && s.feed)) {
    try {
      const feed = await parser.parseURL(source.feed);

      for (const item of feed.items.slice(0, 25)) {
        news.push({
          title: item.title || "Notícia",
          summary: (item.contentSnippet || "").slice(0, 360),
          source: source.name,
          date: item.isoDate || item.pubDate || new Date().toISOString(),
          url: item.link,
          category: source.category || "official",
          image: ""
        });
      }
    } catch (error) {
      console.log("Erro no feed:", source.name);
    }
  }

  const combined = [...news, ...existing]
    .filter((item, index, arr) =>
      arr.findIndex(x => x.url === item.url) === index
    )
    .slice(0, 100);

  fs.writeFileSync(
    "data/news.json",
    JSON.stringify(combined, null, 2)
  );
}

updateNews();
