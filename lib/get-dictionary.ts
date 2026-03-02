import type { Locale } from "./i18n";

const dictionaries = {
  ua: () => import("./dictionaries/ua.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  ru: () => import("./dictionaries/ru.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["ua"]>>;

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
