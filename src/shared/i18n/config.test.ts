import { describe, expect, it } from "@jest/globals";
import { assertLocale, defaultLocale, isLocale, locales } from "./config";

describe("i18n config", () => {
  it("keeps ru as the default locale", () => {
    expect(defaultLocale).toBe("ru");
  });

  it("supports only ru and en", () => {
    expect(locales).toEqual(["ru", "en"]);
    expect(isLocale("ru")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("de")).toBe(false);
  });

  it("throws when asserting an unsupported locale", () => {
    expect(() => assertLocale("fr")).toThrow("Unsupported locale: fr");
  });
});
