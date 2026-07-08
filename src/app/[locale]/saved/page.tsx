import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { isLocale } from "@/shared/i18n/config";
import { SavedArticlesList } from "@/widgets/savedArticles/ui/SavedArticlesList";

type SavedPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function SavedPage({ params }: SavedPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 border-b border-zinc-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-normal text-ink sm:text-5xl">
              {dictionary.savedPage.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              {dictionary.savedPage.description}
            </p>
          </div>

          <Link
            className="self-start rounded-md bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 md:self-auto"
            href={`/${locale}`}
          >
            {dictionary.savedPage.backToNews}
          </Link>
        </header>

        <SavedArticlesList
          articleDictionary={dictionary.article}
          locale={locale}
          savedPageDictionary={dictionary.savedPage}
        />
      </section>
    </main>
  );
}
