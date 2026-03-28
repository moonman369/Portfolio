import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { BiMessageSquareDetail, BiX, BiSend, BiChevronDown } from "react-icons/bi";
import "./chat.css";

const STORAGE_KEY = "portfolio_chat_messages";
const SUGGESTIONS = [
  "Top backend skills",
  "Projects in AI",
  "Compare skills 2023–2025",
  "Show recent full-stack projects",
];
const PIPELINE_STEPS = [
  "Understanding your query...",
  "Searching portfolio...",
  "Preparing response...",
];

const escapeHtml = (value = "") =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const markdownToHtml = (markdown = "") => {
  let html = escapeHtml(markdown);

  html = html.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${code.trim()}</code></pre>`);
  html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");

  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');

  html = html.replace(/(?:^|\n)- (.*?)(?=\n[^- ]|$)/gs, (block) => {
    const items = block
      .trim()
      .split("\n")
      .filter((line) => line.startsWith("- "))
      .map((line) => `<li>${line.slice(2)}</li>`)
      .join("");
    return `<ul>${items}</ul>`;
  });

  html = html
    .split(/\n{2,}/)
    .map((chunk) => {
      const trimmed = chunk.trim();
      if (!trimmed) {
        return "";
      }

      if (/^<(h1|h2|h3|ul|pre)/.test(trimmed)) {
        return trimmed;
      }

      return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("");

  return html;
};

const normalizeSources = (sources) => {
  if (!Array.isArray(sources)) {
    return [];
  }

  return sources
    .map((source, index) => {
      if (!source || typeof source !== "object") {
        return null;
      }

      const tags = Array.isArray(source.tags)
        ? source.tags.filter((tag) => typeof tag === "string" && tag.trim())
        : [];

      return {
        id: source.id || `${source.title || "source"}-${index}`,
        title: source.title || source.name || "Portfolio source",
        description:
          source.description ||
          source.summary ||
          source.excerpt ||
          "Relevant context from the portfolio.",
        tags,
      };
    })
    .filter(Boolean);
};

const renderMessageText = (data) => {
  if (!data) {
    return "I could not generate a response just now.";
  }

  if (typeof data.response === "string" && data.response.trim()) {
    return data.response;
  }

  if (typeof data.answer === "string" && data.answer.trim()) {
    return data.answer;
  }

  return "I could not generate a response just now.";
};

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [expandedSources, setExpandedSources] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setMessages(parsed);
      }
    } catch (storageError) {
      console.log(storageError);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (!isLoading) {
      setLoadingStepIndex(0);
      return undefined;
    }

    const interval = window.setInterval(() => {
      setLoadingStepIndex((prev) => (prev + 1) % PIPELINE_STEPS.length);
    }, 1100);

    return () => window.clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    document.body.classList.add("chat-console-open");
    return () => document.body.classList.remove("chat-console-open");
  }, [isOpen]);

  const canSend = useMemo(() => {
    return input.trim() && !isLoading;
  }, [input, isLoading]);

  const sendMessage = async (prefilledMessage) => {
    const trimmed = (prefilledMessage ?? input).trim();

    if (!trimmed || isLoading) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const { data } = await axios.post("/chat", {
        message: trimmed,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: renderMessageText(data),
          sources: normalizeSources(data?.sources),
        },
      ]);
    } catch (requestError) {
      console.log(requestError);
      setError("Unable to reach query console right now. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "Sorry, something went wrong while preparing your response.",
          sources: [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage();
  };

  const handleSuggestionClick = async (suggestion) => {
    setInput(suggestion);
    await sendMessage(suggestion);
  };

  const toggleSource = (messageId) => {
    setExpandedSources((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  return (
    <div className="chat">
      <button
        className="chat__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close query console" : "Open query console"}
        title={isOpen ? "Close query console" : "Open query console"}
      >
        {isOpen ? <BiX /> : <BiMessageSquareDetail />}
      </button>

      {isOpen && <button className="chat__backdrop" onClick={() => setIsOpen(false)} aria-label="Close query console" />}

      <section className={`chat__panel ${isOpen ? "chat__panel-open" : ""}`} aria-hidden={!isOpen}>
        <div className="chat__header">
          <div>
            <h4>Portfolio Query Console</h4>
            <p>Explore skills, projects, and experience with guided queries.</p>
          </div>
          <button className="chat__close" onClick={() => setIsOpen(false)} aria-label="Close query console">
            <BiX />
          </button>
        </div>

        <div className="chat__messages">
          {messages.length === 0 && (
            <div className="chat__empty">
              Ask targeted questions to explore this portfolio quickly.
            </div>
          )}

          {messages.map((message) => (
            <article
              key={message.id}
              className={`chat__message chat__message-${message.role}`}
            >
              <div className="chat__message-content">
                {message.role === "assistant" ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: markdownToHtml(message.text),
                    }}
                  />
                ) : (
                  message.text
                )}
              </div>

              {message.role === "assistant" && message.sources?.length > 0 && (
                <div className="chat__sources">
                  <button
                    className="chat__sources-toggle"
                    type="button"
                    onClick={() => toggleSource(message.id)}
                    aria-expanded={Boolean(expandedSources[message.id])}
                  >
                    View sources
                    <BiChevronDown
                      className={expandedSources[message.id] ? "chat__sources-open" : ""}
                    />
                  </button>

                  {expandedSources[message.id] && (
                    <div className="chat__sources-list">
                      {message.sources.map((source) => (
                        <div key={source.id} className="chat__source-item">
                          <h5>{source.title}</h5>
                          {source.tags.length > 0 && (
                            <div className="chat__source-tags">
                              {source.tags.map((tag) => (
                                <span key={`${source.id}-${tag}`}>{tag}</span>
                              ))}
                            </div>
                          )}
                          <p>{source.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}

          {isLoading && (
            <div className="chat__loading" role="status" aria-live="polite">
              <div className="chat__loading-steps">
                {PIPELINE_STEPS.map((step, index) => (
                  <p
                    key={step}
                    className={index === loadingStepIndex ? "chat__loading-step-active" : ""}
                  >
                    {step}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {error && <p className="chat__error">{error}</p>}

        <div className="chat__composer">
          <div className="chat__chips" aria-label="Suggested queries">
            {SUGGESTIONS.map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                className="chat__chip"
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={isLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form className="chat__input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, projects, experience..."
              aria-label="Query"
            />
            <button type="submit" disabled={!canSend} aria-label="Send query">
              <BiSend />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Chat;
