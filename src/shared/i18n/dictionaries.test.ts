import { describe, expect, it } from "@jest/globals";
import { getDictionary } from "./dictionaries";

describe("i18n dictionaries", () => {
  it("returns English translations", async () => {
    const dictionary = await getDictionary("en");

    expect(dictionary.home.searchButton).toBe("Search");
    expect(dictionary.newsFeed.emptyTitle).toBe("No articles found");
  });

  it("returns Russian translations", async () => {
    const dictionary = await getDictionary("ru");

    expect(dictionary.language.ru).toBe("RU");
    expect(dictionary.language.en).toBe("EN");
    expect(dictionary.home.title).toBe("News Aggregator");
  });
});
