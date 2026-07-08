import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { fetchHackerNewsArticles } from "./hackerNews";

describe("fetchHackerNewsArticles", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches Hacker News stories and maps them to app articles", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        hits: [
          {
            objectID: "1",
            title: "React Server Components",
            url: "https://example.com/rsc",
            author: "dan",
            created_at: "2026-07-07T10:00:00.000Z",
            points: 42,
            num_comments: 7,
          },
          {
            objectID: "2",
            story_title: "Fallback title",
            story_url: "https://example.com/fallback",
            author: null,
            created_at: null,
            points: null,
            num_comments: null,
          },
        ],
      }),
    } as Response);

    const articles = await fetchHackerNewsArticles("nextjs");
    const requestedUrl = new URL(fetchMock.mock.calls[0][0] as string);

    expect(requestedUrl.origin).toBe("https://hn.algolia.com");
    expect(requestedUrl.pathname).toBe("/api/v1/search");
    expect(requestedUrl.searchParams.get("query")).toBe("nextjs");
    expect(requestedUrl.searchParams.get("tags")).toBe("story");
    expect(requestedUrl.searchParams.get("hitsPerPage")).toBe("12");
    expect(fetchMock.mock.calls[0][1]).toEqual({
      next: {
        revalidate: 300,
      },
    });
    expect(articles).toEqual([
      {
        id: "1",
        title: "React Server Components",
        url: "https://example.com/rsc",
        source: "Hacker News",
        author: "dan",
        publishedAt: "2026-07-07T10:00:00.000Z",
        score: 42,
        commentsCount: 7,
      },
      {
        id: "2",
        title: "Fallback title",
        url: "https://example.com/fallback",
        source: "Hacker News",
        author: "unknown",
        publishedAt: null,
        score: 0,
        commentsCount: 0,
      },
    ]);
  });

  it("falls back to the Hacker News item URL when a hit has no external URL", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        hits: [
          {
            objectID: "123",
            title: "Ask HN",
            url: null,
            story_url: null,
          },
        ],
      }),
    } as Response);

    await expect(fetchHackerNewsArticles("ask")).resolves.toEqual([
      expect.objectContaining({
        id: "123",
        url: "https://news.ycombinator.com/item?id=123",
      }),
    ]);
  });

  it("throws when the Hacker News API responds with an error", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 503,
    } as Response);

    await expect(fetchHackerNewsArticles("nextjs")).rejects.toThrow(
      "Hacker News API failed with 503",
    );
  });
});
