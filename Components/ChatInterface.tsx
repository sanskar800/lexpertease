"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello! I'm your AI Legal Assistant. I can help you with general legal information, explain legal concepts, and guide you to the right legal resources. How can I assist you today?", 
      sender: "bot",
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickResponses = [
    "What is contract law?",
    "Explain employment rights",
    "How do I file a complaint?",
    "What are my legal options?"
  ];

  const generateResponse = (userMessage: string) => {
    const responses = {
      contract: "Contract law governs agreements between parties. A valid contract requires offer, acceptance, consideration, and legal capacity. Would you like me to explain any specific aspect of contract law?",
      employment: "Employment law covers the rights and duties between employers and workers. This includes wages, working conditions, discrimination, and termination. What specific employment issue are you facing?",
      complaint: "To file a legal complaint, you typically need to: 1) Identify the proper court/agency, 2) Prepare required documents, 3) Pay filing fees, 4) Serve the other party. The process varies by case type. What kind of complaint are you considering?",
      options: "Your legal options depend on your specific situation. Common remedies include negotiation, mediation, arbitration, or litigation. I'd recommend consulting with a qualified attorney for personalized advice. Can you tell me more about your situation?",
      default: "That's an interesting legal question. While I can provide general information, every legal situation is unique. For specific legal advice, I recommend consulting with one of our qualified attorneys. Would you like me to help you schedule a consultation?"
    };

    const message = userMessage.toLowerCase();
    if (message.includes('contract')) return responses.contract;
    if (message.includes('employment') || message.includes('work') || message.includes('job')) return responses.employment;
    if (message.includes('complaint') || message.includes('file') || message.includes('sue')) return responses.complaint;
    if (message.includes('option') || message.includes('help') || message.includes('advice')) return responses.options;
    return responses.default;
  };

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = { 
        id: messages.length + 1, 
        text: input, 
        sender: "user",
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      const userInput = input;
      setInput("");
      setIsTyping(true);

      // Simulate AI thinking time
      setTimeout(() => {
        setIsTyping(false);
        const botResponse: Message = {
          id: messages.length + 2,
          text: generateResponse(userInput),
          sender: "bot",
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1200);
    }
  };

  const handleQuickResponse = (response: string) => {
    setInput(response);
    inputRef.current?.focus();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-center">
          <h1 className="text-lg font-semibold text-gray-900">AI Legal Assistant</h1>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-start gap-3 max-w-2xl">
                  {message.sender === "bot" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#0F8BDB] to-blue-600 rounded-full flex items-center justify-center mt-1">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}

                  <div className="flex-1">
                    <motion.div
                      className={`px-4 py-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-[#0F8BDB] text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </motion.div>
                    <div className={`mt-1 text-xs text-gray-500 ${
                      message.sender === "user" ? "text-right" : "text-left"
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>

                  {message.sender === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mt-1">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-start"
            >
              <div className="flex items-start gap-3 max-w-2xl">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#0F8BDB] to-blue-600 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Message AI Legal Assistant..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:ring-2 focus:ring-[#0F8BDB] focus:border-transparent transition-all duration-200 text-sm"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-[#0F8BDB] text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>

          <p className="text-xs text-gray-500 mt-2 text-center">
            AI-generated responses are for informational purposes only. Consult a qualified attorney for legal advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
