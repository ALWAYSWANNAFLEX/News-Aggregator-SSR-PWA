import type { Article } from "@/entities/article/model/types";

type NewsArticlesResponse = {
  articles: Article[];
};

export const newsArticlesQueryKey = (query: string) =>
  ["newsArticles", query] as const;

export async function fetchNewsArticles(query: string): Promise<Article[]> {
  const response = await fetch(`/api/news?query=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch news articles");
  }

  const data = (await response.json()) as NewsArticlesResponse;

  return data.articles;
}
