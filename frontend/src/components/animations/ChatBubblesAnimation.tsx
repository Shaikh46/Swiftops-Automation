import { useEffect, useState } from 'react';

const messages = [
  { text: 'Hello! How can I help you today?', isBot: true },
  { text: 'I need help with my order', isBot: false },
  { text: 'I\'d be happy to assist you with that!', isBot: true },
];

export function ChatBubblesAnimation() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [typingIndex, setTypingIndex] = useState<number | null>(0);

  useEffect(() => {
    const showMessage = (index: number) => {
      if (index >= messages.length) {
        // Reset animation
        setTimeout(() => {
          setVisibleMessages([]);
          setTypingIndex(0);
        }, 2000);
        return;
      }

      // Show typing indicator
      setTypingIndex(index);

      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, index]);
        setTypingIndex(null);
        setTimeout(() => showMessage(index + 1), 800);
      }, 1000);
    };

    showMessage(0);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center space-y-3 p-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} ${
            visibleMessages.includes(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          } transition-all duration-500`}
        >
          <div
            className={`max-w-[70%] px-4 py-2 rounded-2xl ${
              message.isBot
                ? 'bg-neon-blue/20 border border-neon-blue/40 text-white'
                : 'bg-white/10 border border-white/20 text-white'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
      {typingIndex !== null && (
        <div className="flex justify-start">
          <div className="bg-neon-blue/20 border border-neon-blue/40 px-4 py-2 rounded-2xl flex space-x-1">
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}
    </div>
  );
}
