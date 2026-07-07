export function NewsFeedSkeleton() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="h-56 animate-pulse rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
          key={index}
        >
          <div className="h-3 w-32 rounded bg-zinc-200" />
          <div className="mt-5 h-5 w-full rounded bg-zinc-200" />
          <div className="mt-3 h-5 w-5/6 rounded bg-zinc-200" />
          <div className="mt-16 h-3 w-48 rounded bg-zinc-200" />
        </div>
      ))}
    </section>
  );
}
