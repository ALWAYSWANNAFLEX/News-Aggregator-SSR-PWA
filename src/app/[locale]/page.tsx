import { Suspense } from "react";
import { notFound } from "next/navigation";
import { LocaleSwitcher } from "@/features/locale-switcher/ui/locale-switcher";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { isLocale } from "@/shared/i18n/config";
import { NewsFeed } from "@/widgets/news-feed/ui/news-feed";
import { NewsFeedSkeleton } from "@/widgets/news-feed/ui/news-feed-skeleton";

export const dynamic = "force-dynamic";

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    query?: string | string[];
  }>;
};

export default async function Home({ params, searchParams }: HomePageProps) {
  const [{ locale }, queryParams] = await Promise.all([params, searchParams]);

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const rawQuery = Array.isArray(queryParams.query)
    ? queryParams.query[0]
    : queryParams.query;
  const query = rawQuery?.trim() || "technology";

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 border-b border-zinc-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              {dictionary.home.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink sm:text-5xl">
              {dictionary.home.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              {dictionary.home.description}
            </p>
          </div>

          <div className="flex w-full max-w-md flex-col gap-3">
            <LocaleSwitcher
              currentLocale={locale}
              dictionary={dictionary.language}
              query={query}
            />

            <form className="flex gap-2" action={`/${locale}`}>
              <label className="sr-only" htmlFor="query">
                {dictionary.home.searchLabel}
              </label>
              <input
                id="query"
                name="query"
                defaultValue={query}
                className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-teal-100"
                placeholder={dictionary.home.searchPlaceholder}
              />
              <button
                className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
                type="submit"
              >
                {dictionary.home.searchButton}
              </button>
            </form>
          </div>
        </header>

        <Suspense fallback={<NewsFeedSkeleton />}>
          <NewsFeed
            articleDictionary={dictionary.article}
            locale={locale}
            newsFeedDictionary={dictionary.newsFeed}
            query={query}
          />
        </Suspense>
      </section>
    </main>
  );
}
