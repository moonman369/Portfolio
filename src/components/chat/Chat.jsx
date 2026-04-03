import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  BiX,
  BiSend,
  BiChevronDown,
  BiExpandAlt,
  BiCollapseAlt,
  BiUser,
} from "react-icons/bi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./chat.css";
import moonmindLogo from "../../assets/Gemini_Generated_Image_17lr8q17lr8q17lr_Resized.png";

const { REACT_APP_PORTFOLIO_API_HOSTNAME, REACT_APP_PORTFOLIO_API_CHAT } =
  process.env;

const CHAT_ENDPOINT = `${REACT_APP_PORTFOLIO_API_HOSTNAME}${REACT_APP_PORTFOLIO_API_CHAT}`;

const STORAGE_KEY = "portfolio_chat_messages";
const SESSION_STORAGE_KEY = "portfolio_chat_session_id";
const SUGGESTIONS = [
  "Top backend skills",
  "Projects in AI",
  "Compare skills 2023-2025",
  "Show recent full-stack projects",
];
const PIPELINE_STEPS = [
  "Understanding your query...",
  "Searching portfolio...",
  "Preparing response...",
];

const generateSessionId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const normalizeSources = (sources) => {
  if (!Array.isArray(sources)) {
    return [];
  }

  return sources
    .map((document, index) => {
      if (!document || typeof document !== "object") {
        return null;
      }

      const metadata =
        document.metadata && typeof document.metadata === "object"
          ? document.metadata
          : {};
      const tags = [
        document.category,
        metadata.domain,
        metadata.subcategory,
        metadata.proficiency_level,
      ].filter((tag) => typeof tag === "string" && tag.trim());

      return {
        id: document.id || `${document.title || "source"}-${index}`,
        title: document.title || "Portfolio source",
        description:
          document.content_full ||
          document.summary_for_embedding ||
          document.summary ||
          "Relevant context from the portfolio.",
        tags,
      };
    })
    .filter(Boolean);
};

const normalizeMarkdownText = (value = "") =>
  value
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t");

const renderMessageText = (data) => {
  if (data?.status === "success" && typeof data?.data?.summary === "string") {
    const summary = normalizeMarkdownText(data.data.summary).trim();
    if (summary) {
      return summary;
    }
  }

  return "I could not generate a response just now.";
};

const Chat = ({ isOpen, setIsOpen }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessionId] = useState(() => {
    try {
      const storedSessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return storedSessionId || generateSessionId();
    } catch (storageError) {
      console.log(storageError);
      return generateSessionId();
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSources, setExpandedSources] = useState({});
  const [expandedSourceContent, setExpandedSourceContent] = useState({});
  const messagesEndRef = useRef(null);
  const SOURCE_PREVIEW_LIMIT = 220;

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
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    } catch (storageError) {
      console.log(storageError);
    }
  }, [sessionId]);

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
      const requestPayload = {
        prompt: trimmed,
        sessionId,
        metadata: {},
      };

      const { data } = await axios.post(CHAT_ENDPOINT, requestPayload, {
        headers: {
          password: process.env.REACT_APP_MOONMIND_PASSWORD,
        },
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: renderMessageText(data),
          sources: normalizeSources(data?.data?.documents),
        },
      ]);
    } catch (requestError) {
      console.log(requestError);
      setError("Unable to reach Moonmind right now. Please try again.");
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

  const toggleSourceContent = (sourceKey) => {
    setExpandedSourceContent((prev) => ({
      ...prev,
      [sourceKey]: !prev[sourceKey],
    }));
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsExpanded(false);
  };

  return (
    <div className="chat">
      {isOpen && (
        <button
          className="chat__backdrop"
          onClick={handleClose}
          aria-label="Close Moonmind"
        />
      )}

      <section
        className={`chat__panel ${isOpen ? "chat__panel-open" : ""} ${
          isExpanded ? "chat__panel-expanded" : ""
        }`}
        aria-hidden={!isOpen}
      >
        <div className="chat__header">
          <div className="chat__brand">
            <img
              src={moonmindLogo}
              alt="Moonmind logo"
              className="chat__brand-logo"
            />
            <div className="chat__brand-copy">
              <h4>Moonmind</h4>
              <p>
                Explore skills, projects, and experience with guided,
                context-aware queries.
              </p>
            </div>
          </div>
          <div className="chat__header-actions">
            <button
              className="chat__expand"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-label={
                isExpanded ? "Collapse chat window" : "Expand chat window"
              }
              title={isExpanded ? "Collapse" : "Expand"}
              type="button"
            >
              {isExpanded ? <BiCollapseAlt /> : <BiExpandAlt />}
            </button>
            <button
              className="chat__close"
              onClick={handleClose}
              aria-label="Close Moonmind"
              type="button"
            >
              <BiX />
            </button>
          </div>
        </div>

        <div className="chat__messages">
          {messages.length === 0 && (
            <div className="chat__empty">
              Ask targeted questions to explore this portfolio quickly.
            </div>
          )}

          {messages.map((message, index) => (
            <article
              key={message.id}
              className={`chat__message chat__message-${message.role}`}
              style={{ "--message-index": index }}
            >
              <div className={`chat__avatar chat__avatar-${message.role}`}>
                {message.role === "assistant" ? (
                  <img src={moonmindLogo} alt="Moonmind" />
                ) : (
                  <BiUser aria-hidden="true" />
                )}
              </div>

              <div className="chat__bubble">
                <div className="chat__message-content">
                  {message.role === "assistant" ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node: _node, children, ...props }) => (
                          <a {...props} target="_blank" rel="noreferrer">
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {message.text || ""}
                    </ReactMarkdown>
                  ) : (
                    message.text
                  )}
                </div>

                {message.role === "assistant" &&
                  message.sources?.length > 0 && (
                    <div className="chat__sources">
                      <button
                        className="chat__sources-toggle"
                        type="button"
                        onClick={() => toggleSource(message.id)}
                        aria-expanded={Boolean(expandedSources[message.id])}
                      >
                        View sources
                        <BiChevronDown
                          className={
                            expandedSources[message.id]
                              ? "chat__sources-open"
                              : ""
                          }
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
                                    <span key={`${source.id}-${tag}`}>
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <p>
                                {source.description.length >
                                  SOURCE_PREVIEW_LIMIT &&
                                !expandedSourceContent[
                                  `${message.id}-${source.id}`
                                ]
                                  ? `${source.description.slice(0, SOURCE_PREVIEW_LIMIT)}...`
                                  : source.description}
                              </p>
                              {source.description.length >
                                SOURCE_PREVIEW_LIMIT && (
                                <button
                                  className="chat__source-expand"
                                  type="button"
                                  onClick={() =>
                                    toggleSourceContent(
                                      `${message.id}-${source.id}`,
                                    )
                                  }
                                >
                                  {expandedSourceContent[
                                    `${message.id}-${source.id}`
                                  ]
                                    ? "Show less"
                                    : "Show more"}
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </article>
          ))}

          {isLoading && (
            <div className="chat__loading" role="status" aria-live="polite">
              <div className="chat__loading-head">
                <img src={moonmindLogo} alt="" className="chat__loading-logo" />
                <div>
                  <h5>Moonmind is thinking</h5>
                  <div className="chat__loading-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
              <div className="chat__loading-steps">
                {PIPELINE_STEPS.map((step, index) => (
                  <p
                    key={step}
                    className={
                      index === loadingStepIndex
                        ? "chat__loading-step-active"
                        : ""
                    }
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
            <div className="chat__input-wrap">
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
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Chat;
