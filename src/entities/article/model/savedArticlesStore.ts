"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Article } from "./types";

type SavedArticlesState = {
  savedArticles: Article[];
  isArticleSaved: (articleId: string) => boolean;
  removeArticle: (articleId: string) => void;
  toggleArticle: (article: Article) => void;
};

export const useSavedArticlesStore = create<SavedArticlesState>()(
  persist(
    (set, get) => ({
      savedArticles: [],

      isArticleSaved: (articleId) =>
        get().savedArticles.some((article) => article.id === articleId),

      removeArticle: (articleId) =>
        set((state) => ({
          savedArticles: state.savedArticles.filter(
            (article) => article.id !== articleId,
          ),
        })),

      toggleArticle: (article) =>
        set((state) => {
          const isSaved = state.savedArticles.some(
            (savedArticle) => savedArticle.id === article.id,
          );

          if (isSaved) {
            return {
              savedArticles: state.savedArticles.filter(
                (savedArticle) => savedArticle.id !== article.id,
              ),
            };
          }

          return {
            savedArticles: [article, ...state.savedArticles],
          };
        }),
    }),

    {
      name: "NewsAggregatorSavedArticles",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
