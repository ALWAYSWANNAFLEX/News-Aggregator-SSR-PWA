import Link from "next/link";
import { locales, type Locale } from "@/shared/i18n/config";
import type { Dictionary } from "@/shared/i18n/dictionaries";

type LocaleSwitcherProps = {
  currentLocale: Locale;
  query: string;
  dictionary: Dictionary["language"];
};

export function LocaleSwitcher({
  currentLocale,
  query,
  dictionary,
}: LocaleSwitcherProps) {
  return (
    <nav aria-label={dictionary.label} className="flex items-center gap-2">
      {locales.map((locale) => {
        const href = `/${locale}?query=${encodeURIComponent(query)}`;
        const isActive = locale === currentLocale;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "rounded-md bg-ink px-3 py-2 text-sm font-semibold text-white"
                : "rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
            }
            href={href}
            key={locale}
          >
            {dictionary[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
