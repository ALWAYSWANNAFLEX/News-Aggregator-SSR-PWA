import { fetchHackerNewsArticles } from "@/shared/api/hackerNews";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query")?.trim() || "technology";

  try {
    const articles = await fetchHackerNewsArticles(query);

    return Response.json({ articles });
  } catch {
    return Response.json(
      { message: "Failed to fetch news articles" },
      { status: 502 },
    );
  }
}
