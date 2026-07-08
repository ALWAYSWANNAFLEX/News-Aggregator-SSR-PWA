import type { Article } from "@/entities/article/model/types";

type HackerNewsHit = {
  objectID: string;
  title?: string | null;
  story_title?: string | null;
  url?: string | null;
  story_url?: string | null;
  author?: string | null;
  created_at?: string | null;
  points?: number | null;
  num_comments?: number | null;
};

type HackerNewsResponse = {
  hits?: HackerNewsHit[];
};

const hackerNewsSearchUrl = "https://hn.algolia.com/api/v1/search";

export async function fetchHackerNewsArticles(
  query: string,
): Promise<Article[]> {
  const url = new URL(hackerNewsSearchUrl);
  url.searchParams.set("query", query);
  url.searchParams.set("tags", "story");
  url.searchParams.set("hitsPerPage", "12");

  const response = await fetch(url, {
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error(`Hacker News API failed with ${response.status}`);
  }

  const data = (await response.json()) as HackerNewsResponse;

  return (data.hits ?? [])
    .map((hit) => ({
      id: hit.objectID,
      title: hit.title ?? hit.story_title ?? "Untitled story",
      url:
        hit.url ??
        hit.story_url ??
        `https://news.ycombinator.com/item?id=${hit.objectID}`,
      source: "Hacker News",
      author: hit.author ?? "unknown",
      publishedAt: hit.created_at ?? null,
      score: hit.points ?? 0,
      commentsCount: hit.num_comments ?? 0,
    }))
    .filter((article) => article.url.length > 0);
}
