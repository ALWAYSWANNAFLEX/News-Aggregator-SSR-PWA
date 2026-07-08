import type { Locale } from "./config";

const dictionaries = {
  ru: {
    metadata: {
      title: "News Aggregator",
      description:
        "Новостной агрегатор на Next.js с Server Components, FSD и PWA.",
    },
    home: {
      eyebrow: "Next.js 16 / Server Components / FSD",
      title: "News Aggregator",
      description:
        "Первый вертикальный срез: страница остается Server Component, данные приходят из публичного API, а UI организован по FSD.",
      savedLink: "Сохраненные новости",
      searchLabel: "Тема новостей",
      searchPlaceholder: "technology, react, ai...",
      searchButton: "Искать",
    },
    language: {
      label: "Язык",
      ru: "RU",
      en: "EN",
    },
    newsFeed: {
      emptyTitle: "Ничего не найдено",
      emptyDescription:
        "Попробуй другой запрос, например: react, startup, security.",
      errorTitle: "Не удалось загрузить новости",
      errorDescription: "Попробуй обновить страницу или изменить запрос.",
    },
    savedPage: {
      title: "Сохраненные новости",
      description:
        "Здесь хранятся статьи, которые ты отметил для чтения позже.",
      emptyTitle: "Пока ничего не сохранено",
      emptyDescription:
        "Вернись к ленте и сохрани интересные материалы.",
      backToNews: "К ленте новостей",
    },
    article: {
      unknownDate: "Дата неизвестна",
      by: "от",
      points: "очков",
      comments: "комментариев",
      save: "Сохранить",
      saved: "Сохранено",
    },
  },
  en: {
    metadata: {
      title: "News Aggregator",
      description:
        "A Next.js news aggregator built with Server Components, FSD, and PWA.",
    },
    home: {
      eyebrow: "Next.js 16 / Server Components / FSD",
      title: "News Aggregator",
      description:
        "First vertical slice: the page stays a Server Component, data comes from a public API, and UI is organized with FSD.",
      savedLink: "Saved news",
      searchLabel: "News topic",
      searchPlaceholder: "technology, react, ai...",
      searchButton: "Search",
    },
    language: {
      label: "Language",
      ru: "RU",
      en: "EN",
    },
    newsFeed: {
      emptyTitle: "No articles found",
      emptyDescription:
        "Try another query, for example: react, startup, security.",
      errorTitle: "Failed to load news",
      errorDescription: "Try refreshing the page or changing your query.",
    },
    savedPage: {
      title: "Saved news",
      description: "Articles you marked for reading later are stored here.",
      emptyTitle: "No saved articles yet",
      emptyDescription:
        "Go back to the news feed and save something worth revisiting.",
      backToNews: "Back to news",
    },
    article: {
      unknownDate: "Unknown date",
      by: "by",
      points: "points",
      comments: "comments",
      save: "Save",
      saved: "Saved",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}
