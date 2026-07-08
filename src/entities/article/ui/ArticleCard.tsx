import type { Article } from "../model/types";
import { SaveArticleButton } from "@/features/saveArticle/ui/SaveArticleButton";
import type { Locale } from "@/shared/i18n/config";
import type { Dictionary } from "@/shared/i18n/dictionaries";

type ArticleCardProps = {
  article: Article;
  dictionary: Dictionary["article"];
  locale: Locale;
};

export function ArticleCard({ article, dictionary, locale }: ArticleCardProps) {
  const publishedAt = article.publishedAt
    ? new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(article.publishedAt))
    : dictionary.unknownDate;

  return (
    <article className="flex h-full flex-col justify-between rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
          <span>{article.source}</span>
          <span aria-hidden="true">/</span>
          <span>{publishedAt}</span>
        </div>

        <h2 className="mt-3 text-xl font-semibold leading-7 text-ink">
          <a
            className="transition hover:text-accent"
            href={article.url}
            rel="noreferrer"
            target="_blank"
          >
            {article.title}
          </a>
        </h2>
      </div>

      <footer className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
        <span>
          {dictionary.by} {article.author}
        </span>
        <span>
          {article.score} {dictionary.points}
        </span>
        <span>
          {article.commentsCount} {dictionary.comments}
        </span>
        <SaveArticleButton article={article} dictionary={dictionary} />
      </footer>
    </article>
  );
}
