export type Topic = {
  id: string;
  title: string;
  summary: string;
  markdown: string;
};

export type LanguageDoc = {
  id: string;
  name: string;
  group: string;
  accent: string;
  description: string;
  topics: Topic[];
};
