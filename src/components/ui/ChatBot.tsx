"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Message interface for chatbot conversation
 */
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

/**
 * ChatBot - Premium AI Sales Assistant with god-level UI
 *
 * Features:
 * - Glass-morphism design with blur effects
 * - Smooth animations and transitions
 * - Typing indicators and message animations
 * - Responsive design for all screen sizes
 * - Interactive message history
 * - Modern chat bubble system
 * - Auto-resize input field
 * - Scroll to latest message
 * - Hover states and micro-interactions
 */
export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I'm your AI Sales Assistant. I can help you with vehicle information, pricing, and features. Ask me anything!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Set mounted state without triggering useEffect warning
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // Small delay to ensure hydration mismatch doesn't occur while keeping React happy
    const t = setTimeout(() => setIsMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponses = [
        "Great question! Based on the vehicle's specifications, this model features advanced AI-powered photography capabilities.",
        "I can help you with that! The pricing for this vehicle starts at $89,999, with various financing options available.",
        "Excellent choice! This particular model has a 0-60 time of 3.2 seconds and comes with premium interior features.",
        "Let me check that for you... The vehicle has a comprehensive warranty including 4 years of roadside assistance.",
        "Based on your preferences, I'd recommend the premium package which includes enhanced photography features and extended support.",
      ];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  /**
   * Handle Enter key press for sending messages
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /**
   * Auto-resize textarea based on content
   */
  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputText]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed bottom-12 right-12 z-40 flex flex-col items-end transition-opacity duration-500 ${isMounted ? "opacity-100" : "opacity-0"}`}
    >
      {/* FAB Button (when closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl flex items-center justify-center pointer-events-auto"
          aria-label="Open AI Sales Assistant"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}

      {/* Chat Container (when open) */}
      {isOpen && (
        <div className="w-96 max-w-[calc(100vw-2rem)] bg-[#0a0a0a]/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl h-[600px] max-h-[80vh] flex flex-col pointer-events-auto animate-fade-in origin-bottom-right">
          {/* Header */}
          <div className="glass-nav border-b border-white/10 p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              {/* Bot Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-orange-600 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse" />
              </div>

              <div>
                <h3 className="font-semibold text-white">AI Sales Assistant</h3>
                <p className="text-xs text-slate-400">Always online</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-[440px] overflow-y-auto p-4 space-y-4 hide-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex animate-fade-in ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                    message.sender === "user"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-white/10 border border-white/5 text-white rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="glass-panel border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about vehicles, pricing, or features..."
                  className="
                      w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                      text-white placeholder-slate-400 resize-none hide-scrollbar
                      focus:outline-none focus:border-primary/50 focus:bg-white/10
                      transition-all duration-300
                    "
                  rows={1}
                  style={{ minHeight: "48px", maxHeight: "120px" }}
                />

                {/* Character count */}
                <div className="absolute bottom-2 right-2 text-xs text-slate-500">
                  {inputText.length}/500
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={sendMessage}
                disabled={!inputText.trim() || isTyping}
                className="
                    w-12 h-12 rounded-xl bg-primary hover:bg-primary/80
                    flex items-center justify-center transition-all duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:scale-105 active:scale-95
                  "
              >
                <svg
                  className="w-5 h-5 text-white transform translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                  />
                </svg>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {["Pricing", "Features", "Specifications", "Warranty"].map(
                (action) => (
                  <button
                    key={action}
                    onClick={() =>
                      setInputText(`Tell me about ${action.toLowerCase()}`)
                    }
                    className="
                      px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full
                      hover:bg-white/10 transition-colors duration-300
                    "
                  >
                    {action}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
