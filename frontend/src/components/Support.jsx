import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  Mail,
  Phone,
  HelpCircle,
  Send,
  MessageCircle,
} from "lucide-react";

const supportTopics = [
  { title: "FAQs", description: "Frequently Asked Questions" },
  { title: "Contact Us", description: "Get in touch with our team" },
  {
    title: "Account Issues",
    description: "Help with login, signup, and profile",
  },
  {
    title: "Rentals & Bookings",
    description: "Questions about renting and booking",
  },
  {
    title: "Payments & Billing",
    description: "Payment methods, refunds, and invoices",
  },
  {
    title: "Technical Support",
    description: "Report bugs or technical issues",
  },
  { title: "Feedback", description: "Share your thoughts with us" },
];

const faqs = [
  {
    q: "How do I reset my password?",
    a: "Go to your account settings and click 'Reset Password'.",
  },
  {
    q: "How do I contact support?",
    a: "You can use the chat or email us at support@rentsmart.com.",
  },
  {
    q: "How do I book a rental?",
    a: "Browse items, select your tool, and click 'Book Now'.",
  },
];

function FAQAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <div className="mb-8">
      <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-emerald-400" /> Frequently Asked
        Questions
      </h4>
      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white/10 rounded-lg">
            <button
              className="w-full text-left px-4 py-3 text-white font-medium flex justify-between items-center focus:outline-none"
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              {faq.q}
              <span className="ml-2 text-emerald-400">
                {open === idx ? "-" : "+"}
              </span>
            </button>
            {open === idx && (
              <div className="px-4 pb-3 text-gray-300 text-sm">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactCard() {
  return (
    <div className="bg-white/10 rounded-xl p-4 mb-8">
      <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
        <Mail className="w-5 h-5 text-emerald-400" /> Contact Support
      </h4>
      <div className="text-gray-300 text-sm mb-2">
        Email:{" "}
        <a
          href="mailto:support@rentsmart.com"
          className="text-emerald-400 underline"
        >
          support@rentsmart.com
        </a>
      </div>
      <div className="text-gray-300 text-sm">
        Phone:{" "}
        <a href="tel:+1234567890" className="text-emerald-400 underline">
          +1 234 567 890
        </a>
      </div>
    </div>
  );
}

function QuickLinks() {
  return (
    <div className="bg-white/10 rounded-xl p-4 mb-8">
      <h4 className="text-lg font-bold text-white mb-2">Quick Links</h4>
      <ul className="space-y-2">
        <li>
          <a href="/browse-items" className="text-emerald-400 hover:underline">
            Browse Rentals
          </a>
        </li>
        <li>
          <a href="/signup" className="text-emerald-400 hover:underline">
            Create Account
          </a>
        </li>
        <li>
          <a href="/signin" className="text-emerald-400 hover:underline">
            Sign In
          </a>
        </li>
        <li>
          <a href="/" className="text-emerald-400 hover:underline">
            Home
          </a>
        </li>
      </ul>
    </div>
  );
}

export const Support = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  // Ensure page starts at the top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Remove automatic scrolling to bottom - only scroll when user sends a message
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      // Scroll only within the messages container, not the page
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window))
      return;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    recognitionRef.current.onend = () => setListening(false);
    recognitionRef.current.onerror = () => setListening(false);
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;
    setListening(true);
    recognitionRef.current.start();
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    // Clear input immediately for snappy UX
    const userInput = input;
    setInput("");

    // Add the user message + placeholder AI message
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userInput },
      { sender: "ai", text: "..." }, // temporary loading
    ]);

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Server error");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let aiReply = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data:")) {
            const data = line.replace(/^data:\s*/, "");

            if (data === "[DONE]") {
              return; // end of stream
            }

            try {
              // Some chunks are JSON-stringified, some plain text
              const parsed = JSON.parse(data);
              aiReply += parsed;
            } catch {
              aiReply += data;
            }

            // Update the last AI message progressively
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last && last.sender === "ai") {
                return [...prev.slice(0, -1), { sender: "ai", text: aiReply }];
              } else {
                return [...prev, { sender: "ai", text: aiReply }];
              }
            });
          }
        }
      }
    } catch (err) {
      console.error("Error in sendMessage:", err.message);

      // Replace placeholder with friendly fallback
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          sender: "ai",
          text: "⚠️ We are currently out of service. Please contact us through other options.",
        },
      ]);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Support <span className="text-emerald-400">Center</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
            Get help and assistance with your rental experience
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left: Info/Topics/FAQ/Contact */}
          <div className="w-full lg:w-2/5 flex flex-col gap-6 order-2 lg:order-1">
            <div className="bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Support Topics
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {supportTopics.map((topic, idx) => (
                  <li key={idx} className="">
                    <div className="p-4 rounded-lg bg-white/10 hover:bg-emerald-400/20 transition-all duration-300 cursor-pointer border border-white/5 hover:border-emerald-400/30">
                      <div className="text-white font-semibold text-sm sm:text-base">
                        {topic.title}
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm mt-1">
                        {topic.description}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <QuickLinks />
              <ContactCard />
              <FAQAccordion />
            </div>
          </div>
          {/* Right: Chat (fixed height, larger) */}
          <div className="w-full lg:w-3/5 flex flex-col order-1 lg:order-2">
            <div className="bg-white/5 rounded-2xl shadow-2xl border border-white/10 flex flex-col h-[70vh] sm:h-[75vh] lg:h-[85vh] max-h-[600px] lg:max-h-[700px]">
              {/* Header */}
              <div className="flex items-center gap-3 p-4 sm:p-6 border-b border-white/10 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-t-2xl flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-400 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                    AI Chat Support
                  </h2>
                  <p className="text-emerald-400 text-xs sm:text-sm">
                    Online • Ready to help
                  </p>
                </div>
              </div>

              {/* Messages Container - Fixed Height with Internal Scroll Only */}
              <div
                className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-0"
                ref={messagesContainerRef}
              >
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 sm:px-6 py-3 sm:py-4 rounded-2xl max-w-xs sm:max-w-md lg:max-w-lg text-sm sm:text-base shadow-lg ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-black rounded-br-md"
                          : "bg-gradient-to-r from-white/10 to-white/5 text-white rounded-bl-md border border-white/10"
                      }`}
                    >
                      {msg.sender === "ai" && msg.text === "..." ? (
                        <span className="animate-pulse">...</span>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - Fixed Height */}
              <div className="p-4 sm:p-6 border-t border-white/10 bg-gradient-to-r from-white/5 to-white/10 rounded-b-2xl flex-shrink-0">
                <form onSubmit={sendMessage} className="flex gap-2 sm:gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 pr-14 sm:pr-16 text-sm sm:text-base"
                      placeholder={
                        listening ? "Listening..." : "Type your message here..."
                      }
                      disabled={listening}
                    />
                    <button
                      type="button"
                      onClick={handleMicClick}
                      className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
                        listening
                          ? "bg-emerald-400 text-black shadow-lg scale-110"
                          : "bg-white/10 text-emerald-400 hover:bg-emerald-400/20 hover:scale-105"
                      }`}
                      aria-label="Speak"
                      disabled={listening}
                    >
                      <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="px-4 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-bold hover:from-emerald-500 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base"
                    disabled={listening || !input.trim()}
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
