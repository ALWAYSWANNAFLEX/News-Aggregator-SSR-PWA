"use client";

import Link from "next/link";
import { ArticleCard } from "@/entities/article/ui/ArticleCard";
import { useSavedArticlesStore } from "@/entities/article/model/savedArticlesStore";
import type { Locale } from "@/shared/i18n/config";
import type { Dictionary } from "@/shared/i18n/dictionaries";

type SavedArticlesListProps = {
  articleDictionary: Dictionary["article"];
  locale: Locale;
  savedPageDictionary: Dictionary["savedPage"];
};

export function SavedArticlesList({
  articleDictionary,
  locale,
  savedPageDictionary,
}: SavedArticlesListProps) {
  const savedArticles = useSavedArticlesStore((state) => state.savedArticles);

  if (savedArticles.length === 0) {
    return (
      <section className="rounded-lg border border-zinc-200 bg-white p-8 text-center">
        <h2 className="text-2xl font-semibold text-ink">
          {savedPageDictionary.emptyTitle}
        </h2>
        <p className="mt-2 text-muted">
          {savedPageDictionary.emptyDescription}
        </p>
        <Link
          className="mt-6 inline-flex rounded-md bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
          href={`/${locale}`}
        >
          {savedPageDictionary.backToNews}
        </Link>
      </section>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {savedArticles.map((article) => (
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
