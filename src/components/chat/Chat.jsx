import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { BiMessageSquareDetail, BiX, BiSend } from "react-icons/bi";
import "./chat.css";

const STORAGE_KEY = "portfolio_chat_messages";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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

  const canSend = useMemo(() => {
    return input.trim() && !isLoading;
  }, [input, isLoading]);

  const sendMessage = async () => {
    const trimmed = input.trim();

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
          text: data?.response || "I could not generate a response just now.",
        },
      ]);
    } catch (requestError) {
      console.log(requestError);
      setError("Unable to reach chat right now. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "Sorry, something went wrong while getting a response.",
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

  return (
    <div className="chat">
      <button
        className="chat__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        title={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <BiX /> : <BiMessageSquareDetail />}
      </button>

      <div className={`chat__panel ${isOpen ? "chat__panel-open" : ""}`}>
        <div className="chat__header">
          <h4>AI Assistant</h4>
          <span className="chat__status">Online</span>
        </div>

        <div className="chat__messages">
          {messages.length === 0 && (
            <div className="chat__empty">
              Ask anything about this portfolio, projects, or skills.
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat__message chat__message-${message.role}`}
            >
              {message.text}
            </div>
          ))}

          {isLoading && (
            <div className="chat__message chat__message-assistant chat__typing">
              <span />
              <span />
              <span />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {error && <p className="chat__error">{error}</p>}

        <form className="chat__input-row" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            aria-label="Message"
          />
          <button type="submit" disabled={!canSend} aria-label="Send message">
            <BiSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
