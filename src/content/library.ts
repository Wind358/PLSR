import type { LanguageDoc, Topic } from "./types";

type MarkdownMeta = {
  languageId?: string;
  languageName?: string;
  group?: string;
  accent?: string;
  description?: string;
  topicId?: string;
  topicTitle?: string;
  summary?: string;
  order?: string;
};

type ParsedDoc = {
  meta: MarkdownMeta;
  body: string;
  path: string;
};

const markdownFiles = import.meta.glob("../../content/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseMarkdown(path: string, raw: string): ParsedDoc {
  if (!raw.startsWith("---")) {
    return {
      path,
      meta: inferMetaFromPath(path),
      body: raw,
    };
  }

  const endIndex = raw.indexOf("\n---", 3);

  if (endIndex === -1) {
    return {
      path,
      meta: inferMetaFromPath(path),
      body: raw,
    };
  }

  const frontmatter = raw.slice(3, endIndex).trim();
  const body = raw.slice(endIndex + 4).trimStart();
  const meta = frontmatter.split(/\r?\n/).reduce<MarkdownMeta>((acc, line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) return acc;

    const key = line.slice(0, separatorIndex).trim() as keyof MarkdownMeta;
    const value = line.slice(separatorIndex + 1).trim();
    acc[key] = value;
    return acc;
  }, {});

  return {
    path,
    meta: {
      ...inferMetaFromPath(path),
      ...meta,
    },
    body,
  };
}

function inferMetaFromPath(path: string): MarkdownMeta {
  const parts = path.replace(/\\/g, "/").split("/");
  const file = parts[parts.length - 1]?.replace(/\.md$/, "") ?? "topic";
  const language = parts[parts.length - 2] ?? "custom";

  return {
    languageId: slug(language),
    languageName: titleCase(language),
    group: "Custom",
    accent: "#3b82f6",
    description: "Custom Markdown documents.",
    topicId: slug(file),
    topicTitle: titleCase(file),
    summary: "Markdown document.",
    order: "999",
  };
}

function slug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function sortByOrderThenTitle<T extends { order?: number; title?: string; name?: string }>(
  left: T,
  right: T,
) {
  const leftOrder = left.order ?? 999;
  const rightOrder = right.order ?? 999;
  if (leftOrder !== rightOrder) return leftOrder - rightOrder;
  return (left.title ?? left.name ?? "").localeCompare(right.title ?? right.name ?? "");
}

const parsedDocs = Object.entries(markdownFiles).map(([path, raw]) => parseMarkdown(path, raw));

const languageMap = parsedDocs.reduce<Map<string, LanguageDoc & { order?: number }>>(
  (map, doc) => {
    const languageId = doc.meta.languageId ?? "custom";
    const language = map.get(languageId);
    const topic: Topic & { order?: number } = {
      id: doc.meta.topicId ?? slug(doc.path),
      title: doc.meta.topicTitle ?? "Untitled",
      summary: doc.meta.summary ?? "",
      markdown: doc.body,
      order: Number(doc.meta.order ?? 999),
    };

    if (language) {
      language.topics.push(topic);
      return map;
    }

    map.set(languageId, {
      id: languageId,
      name: doc.meta.languageName ?? titleCase(languageId),
      group: doc.meta.group ?? "Custom",
      accent: doc.meta.accent ?? "#3b82f6",
      description: doc.meta.description ?? "",
      topics: [topic],
      order: Number(doc.meta.order ?? 999),
    });

    return map;
  },
  new Map(),
);

export const languages: LanguageDoc[] = Array.from(languageMap.values())
  .map((language) => ({
    ...language,
    topics: [...language.topics].sort(sortByOrderThenTitle),
  }))
  .sort(sortByOrderThenTitle);
