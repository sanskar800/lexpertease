"use client";
import Navbar from "../../Components/Navbar";
import ChatInterface from "../../Components/ChatInterface";
import { useState } from "react";

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex h-screen pt-16 max-w-7xl mx-auto shadow-lg rounded-lg border border-gray-200 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">AI Assistant</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
                className="text-gray-500 hover:text-gray-700"
              >
                &#x2715;
              </button>
            </div>

            <button
              className="m-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={() => window.location.reload()}
            >
              + New Chat
            </button>

            <div className="flex-1 overflow-y-auto px-6">
              <h3 className="font-semibold mb-4 text-gray-700">Chat History</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {/* Placeholder for chat history items */}
                <li className="cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2">
                  Chat 1
                </li>
                <li className="cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2">
                  Chat 2
                </li>
                <li className="cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2">
                  Chat 3
                </li>
              </ul>
            </div>
          </aside>
        )}

        {/* Main Chat Interface */}
        <main className="flex-1 flex flex-col bg-white">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="m-4 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition self-start"
            >
              Open Sidebar
            </button>
          )}
          <ChatInterface />
        </main>
      </div>
    </div>
  );
}
