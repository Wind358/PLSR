import { BookOpen, ChevronLeft, ChevronRight, Copy, Moon, Search, Sun } from "lucide-react";
import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { languages } from "./content/library";

function App() {
  const [selectedLanguageId, setSelectedLanguageId] = useState(languages[0].id);
  const [selectedTopicId, setSelectedTopicId] = useState(languages[0].topics[0].id);
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);
  const [languagePaneCollapsed, setLanguagePaneCollapsed] = useState(false);
  const [topicPaneCollapsed, setTopicPaneCollapsed] = useState(false);

  const filteredLanguages = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return languages;

    return languages
      .map((language) => ({
        ...language,
        topics: language.topics.filter((topic) => {
          const haystack = [
            language.name,
            language.group,
            language.description,
            topic.title,
            topic.summary,
            topic.markdown,
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(keyword);
        }),
      }))
      .filter((language) => {
        return (
          language.name.toLowerCase().includes(keyword) ||
          language.description.toLowerCase().includes(keyword) ||
          language.topics.length > 0
        );
      });
  }, [query]);

  const selectedLanguage =
    languages.find((language) => language.id === selectedLanguageId) ?? languages[0];

  const selectedTopic =
    selectedLanguage.topics.find((topic) => topic.id === selectedTopicId) ??
    selectedLanguage.topics[0];

  const selectLanguage = (languageId: string) => {
    const language = languages.find((item) => item.id === languageId) ?? languages[0];
    setSelectedLanguageId(language.id);
    setSelectedTopicId(language.topics[0].id);
  };

  return (
    <main
      className={[
        "app",
        dark ? "dark" : "",
        languagePaneCollapsed ? "language-collapsed" : "",
        topicPaneCollapsed ? "topic-collapsed" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <aside className="language-pane">
        <div className="brand-row">
          {!languagePaneCollapsed && (
            <div className="brand">
              <div className="brand-icon">
                <BookOpen size={20} strokeWidth={2.2} />
              </div>
              <div>
                <h1>Syntax MD</h1>
                <p>本地编程语法手册</p>
              </div>
            </div>
          )}
          <button
            className="collapse-button"
            onClick={() => setLanguagePaneCollapsed((value) => !value)}
            title={languagePaneCollapsed ? "展开语言栏" : "收起语言栏"}
            type="button"
          >
            {languagePaneCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {!languagePaneCollapsed && (
          <>
            <label className="search-box">
              <Search size={16} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索语言、主题、示例"
              />
            </label>

            <div className="language-list" aria-label="语言列表">
              {filteredLanguages.map((language) => (
                <button
                  key={language.id}
                  className={
                    language.id === selectedLanguage.id ? "language-item active" : "language-item"
                  }
                  onClick={() => selectLanguage(language.id)}
                  type="button"
                >
                  <span className="language-accent" style={{ backgroundColor: language.accent }} />
                  <span>
                    <strong>{language.name}</strong>
                    <small>{language.group}</small>
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </aside>

      <nav className="topic-pane" aria-label="主题目录">
        <div className="pane-header">
          {!topicPaneCollapsed && <span>{selectedLanguage.name}</span>}
          <div className="pane-actions">
            <button
              className="collapse-button"
              onClick={() => setTopicPaneCollapsed((value) => !value)}
              title={topicPaneCollapsed ? "展开主题栏" : "收起主题栏"}
              type="button"
            >
              {topicPaneCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
            {!topicPaneCollapsed && (
              <button
                className="icon-button"
                onClick={() => setDark((value) => !value)}
                title={dark ? "切换到浅色模式" : "切换到深色模式"}
                type="button"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </div>
        </div>

        {!topicPaneCollapsed && (
          <>
            <p className="language-description">{selectedLanguage.description}</p>

            <div className="topic-list">
              {selectedLanguage.topics.map((topic) => (
                <button
                  key={topic.id}
                  className={topic.id === selectedTopic.id ? "topic-item active" : "topic-item"}
                  onClick={() => setSelectedTopicId(topic.id)}
                  type="button"
                >
                  <strong>{topic.title}</strong>
                  <span>{topic.summary}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </nav>

      <section className="reader-pane" aria-label="Markdown 内容">
        <article className="markdown-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { children, className } = props;
                const match = /language-(\w+)/.exec(className ?? "");
                const text = String(children).replace(/\n$/, "");

                if (!match) {
                  return <code>{children}</code>;
                }

                return (
                  <div className="code-block">
                    <div className="code-toolbar">
                      <span>{match[1]}</span>
                      <button
                        className="copy-button"
                        onClick={() => navigator.clipboard.writeText(text)}
                        title="复制代码"
                        type="button"
                      >
                        <Copy size={15} />
                      </button>
                    </div>
                    <pre>
                      <code className={className}>{children}</code>
                    </pre>
                  </div>
                );
              },
            }}
          >
            {selectedTopic.markdown}
          </ReactMarkdown>
        </article>
      </section>
    </main>
  );
}

export default App;
