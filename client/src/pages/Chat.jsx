import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import API from "../services/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Chat = () => {
    const [messages, setMessages] = useState([
        {
            role: "ai",
            content:
                "Hi Sujal! I'm your AI Study Buddy. I can help you with complex engineering topics, solve problems, or explain concepts. What are we studying today?",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

const sendMessage = async () => {
  if (!input.trim()) return;

  const userMsg = {
    role: "user",
    content: input,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  const updatedMessages = [...messages, userMsg];

  setMessages(updatedMessages);
  setInput("");
  setLoading(true);

  try {
    const res = await API.post("/ai/chat", {
      messages: updatedMessages.map((msg) => ({
        role: msg.role === "ai" ? "assistant" : "user",
        content: msg.content,
      })),
    });

    const aiMsg = {
      role: "ai",
      content: res.data.reply,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, aiMsg]);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] bg-gray-50 rounded-2xl shadow-sm">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {msg.role === "ai" && (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white mr-3">
                                🤖
                            </div>
                        )}

                        <div
                            className={`max-w-2xl px-6 py-4 rounded-2xl shadow-sm ${msg.role === "user"
                                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                                    : "bg-white text-gray-800"
                                }`}
                        >
                            <div className="prose prose-lg max-w-none
  prose-table:border
  prose-th:border
  prose-td:border
  prose-th:bg-gray-100
  prose-table:border-collapse">

                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.content}
                                </ReactMarkdown>

                            </div>

                            <div className="text-xs mt-2 opacity-60 text-right">
                                {msg.time}
                            </div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white">
                            🤖
                        </div>
                        <div className="bg-white px-6 py-4 rounded-2xl shadow-sm">
                            Typing...
                        </div>
                    </div>
                )}

                <div ref={bottomRef}></div>
            </div>

            {/* Input Area */}
            <div className="p-6 border-t bg-white">
                <div className="relative max-w-3xl mx-auto">
                    <input
                        type="text"
                        placeholder="Ask anything ....."
                        className="w-full pl-6 pr-14 py-4 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button
                        onClick={sendMessage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full text-white shadow-md hover:scale-105 transition"
                    >
                        <Send size={18} />
                    </button>
                </div>

                <p className="text-xs text-center text-gray-400 mt-3">
                    AI Study Buddy can make mistakes. Consider checking important information.
                </p>
            </div>

        </div>
    );
};

export default Chat;