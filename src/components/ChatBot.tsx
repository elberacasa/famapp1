import React, { useState } from 'react';
import { Transaction } from '../App';

interface Props {
  transactions: Transaction[];
  isDarkMode: boolean;
}

const ChatBot: React.FC<Props> = ({ transactions, isDarkMode }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isUser: true }]);
    const response = generateResponse(input);
    setMessages(prev => [...prev, { text: response, isUser: false }]);
    setInput('');
  };

  const generateResponse = (question: string): string => {
    const lowercaseQuestion = question.toLowerCase();
    
    if (lowercaseQuestion.includes('total spent')) {
      const total = transactions.reduce((sum, t) => sum + t.amount, 0);
      return `The total amount spent is $${total.toFixed(2)}.`;
    }
    
    if (lowercaseQuestion.includes('most expensive')) {
      const mostExpensive = transactions.reduce((max, t) => t.amount > max.amount ? t : max);
      return `The most expensive transaction was "${mostExpensive.description}" for $${mostExpensive.amount.toFixed(2)}.`;
    }
    
    if (lowercaseQuestion.includes('categories')) {
      const categories = [...new Set(transactions.map(t => t.category))];
      return `The categories in your transactions are: ${categories.join(', ')}.`;
    }
    
    return "I'm sorry, I don't have enough information to answer that question. You can ask about total spent, most expensive transaction, or categories.";
  };

  return (
    <div className={`chat-bot ${isDarkMode ? 'dark' : ''}`}>
      <h2>Chat Bot</h2>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your transactions..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;