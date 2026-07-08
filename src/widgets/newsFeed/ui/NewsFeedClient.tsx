"use client";

import { useQuery } from "@tanstack/react-query";
import { ArticleCard } from "@/entities/article/ui/ArticleCard";
import type { Article } from "@/entities/article/model/types";
import type { Locale } from "@/shared/i18n/config";
import type { Dictionary } from "@/shared/i18n/dictionaries";
import {
  fetchNewsArticles,
  newsArticlesQueryKey,
} from "@/widgets/newsFeed/api/newsQueries";
import { NewsFeedSkeleton } from "./NewsFeedSkeleton";

type NewsFeedClientProps = {
  articleDictionary: Dictionary["article"];
  initialArticles: Article[];
  locale: Locale;
  newsFeedDictionary: Dictionary["newsFeed"];
  query: string;
};

export function NewsFeedClient({
  articleDictionary,
  initialArticles,
  locale,
  newsFeedDictionary,
  query,
}: NewsFeedClientProps) {
  const {
    data: articles = [],
    error,
    isFetching,
  } = useQuery({
    queryKey: newsArticlesQueryKey(query),
    queryFn: () => fetchNewsArticles(query),
    initialData: initialArticles,
  });

  if (error) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-8 text-center">
        <h2 className="text-2xl font-semibold text-ink">
          {newsFeedDictionary.errorTitle}
        </h2>
        <p className="mt-2 text-muted">{newsFeedDictionary.errorDescription}</p>
      </section>
    );
  }

  if (isFetching && articles.length === 0) {
    return <NewsFeedSkeleton />;
  }

  if (articles.length === 0) {
    return (
      <section className="rounded-lg border border-zinc-200 bg-white p-8 text-center">
        <h2 className="text-2xl font-semibold text-ink">
          {newsFeedDictionary.emptyTitle}
        </h2>
        <p className="mt-2 text-muted">{newsFeedDictionary.emptyDescription}</p>
      </section>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard
          article={article}
          dictionary={articleDictionary}
          key={article.id}
          locale={locale}
        />
      ))}
    </section>
  );
}
