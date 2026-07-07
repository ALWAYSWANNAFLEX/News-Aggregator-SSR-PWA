export type Article = {
  id: string;
  title: string;
  url: string;
  source: string;
  author: string;
  publishedAt: string | null;
  score: number;
  commentsCount: number;
};
