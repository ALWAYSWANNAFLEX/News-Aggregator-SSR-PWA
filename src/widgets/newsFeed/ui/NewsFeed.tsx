import { fetchHackerNewsArticles } from "@/shared/api/hackerNews";
import type { Locale } from "@/shared/i18n/config";
import type { Dictionary } from "@/shared/i18n/dictionaries";
import { NewsFeedClient } from "./NewsFeedClient";

type NewsFeedProps = {
  articleDictionary: Dictionary["article"];
  locale: Locale;
  newsFeedDictionary: Dictionary["newsFeed"];
  query: string;
};

export async function NewsFeed({
  articleDictionary,
  locale,
  newsFeedDictionary,
  query,
}: NewsFeedProps) {
  const articles = await fetchHackerNewsArticles(query);

  return (
    <NewsFeedClient
      articleDictionary={articleDictionary}
      initialArticles={articles}
      locale={locale}
      newsFeedDictionary={newsFeedDictionary}
      query={query}
    />
  );
}
