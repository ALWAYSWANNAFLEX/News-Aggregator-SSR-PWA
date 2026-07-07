import { ArticleCard } from "@/entities/article/ui/article-card";
import { fetchHackerNewsArticles } from "@/shared/api/hacker-news";
import type { Locale } from "@/shared/i18n/config";
import type { Dictionary } from "@/shared/i18n/dictionaries";

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
