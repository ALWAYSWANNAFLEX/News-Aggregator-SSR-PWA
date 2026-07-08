"use client";

import type { Article } from "@/entities/article/model/types";
import { useSavedArticlesStore } from "@/entities/article/model/savedArticlesStore";
import type { Dictionary } from "@/shared/i18n/dictionaries";

type SaveArticleButtonProps = {
  article: Article;
  dictionary: Dictionary["article"];
};

export function SaveArticleButton({
  article,
  dictionary,
}: SaveArticleButtonProps) {
  const isSaved = useSavedArticlesStore((state) =>
    state.isArticleSaved(article.id),
  );
  const toggleArticle = useSavedArticlesStore((state) => state.toggleArticle);

  return (
    <button
      aria-pressed={isSaved}
      className={
        isSaved
          ? "rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
          : "rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
      }
      onClick={() => toggleArticle(article)}
      type="button"
    >
      {isSaved ? dictionary.saved : dictionary.save}
    </button>
  );
}
