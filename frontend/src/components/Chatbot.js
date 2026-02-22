import React, { useState, useRef, useEffect } from 'react';
import API from '../api/axios';
import './Chatbot.css';

function Chatbot({ isOpen, onClose, isExpanded, onToggleExpand }) {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hello! 👋 I'm KodBank AI Assistant. I'm here to help you with all your banking needs. How are you doing today? Feel free to ask me anything about our services!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message
    const newUserMessage = {
      type: 'user',
      text: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Build conversation history
      const conversationHistory = messages
        .filter(msg => msg.type !== 'system')
        .map(msg => ({
          user: msg.type === 'user' ? msg.text : '',
          assistant: msg.type === 'bot' ? msg.text : ''
        }))
        .filter(msg => msg.user || msg.assistant);

      const response = await API.post('/api/chatbot/chat', {
        message: userMessage,
        conversationHistory
      });

      // Add bot response
      const botMessage = {
        type: 'bot',
        text: response.data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        type: 'bot',
        text: error.response?.data?.response || "I'm sorry, I'm having trouble connecting. Please try again or contact our support team at 1800-123-4567.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  const quickQuestions = [
    "What services does KodBank offer?",
    "How do I check my balance?",
    "Tell me about interest rates",
    "How can I contact support?",
    "What credit cards are available?",
    "How do I apply for a loan?",
    "What are the card benefits?",
    "Tell me about home loans"
  ];

  if (!isOpen) return null;

  return (
    <div className={`chatbot-container ${isExpanded ? 'expanded' : 'minimized'}`}>
      <div className="chatbot-header">
        <div className="chatbot-header-info">
          <div className="chatbot-avatar">🤖</div>
          <div>
            <h3>KodBank AI Assistant</h3>
            <span className="chatbot-status">Online</span>
          </div>
        </div>
        <div className="chatbot-header-actions">
          <button 
            className="chatbot-action-btn" 
            onClick={onToggleExpand}
            title={isExpanded ? "Minimize" : "Expand"}
          >
            {isExpanded ? '🗗' : '⛶'}
          </button>
          <button 
            className="chatbot-action-btn" 
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-content">
              {message.type === 'bot' && <span className="message-avatar">🤖</span>}
              <div className="message-bubble">
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {message.type === 'user' && <span className="message-avatar">👤</span>}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot">
            <div className="message-content">
              <span className="message-avatar">🤖</span>
              <div className="message-bubble typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-questions">
        <div className="quick-questions-header">
          <p className="quick-questions-title">Quick questions:</p>
          <button 
            className="toggle-questions-btn"
            onClick={() => setShowQuickQuestions(!showQuickQuestions)}
            title={showQuickQuestions ? "Hide questions" : "Show questions"}
          >
            {showQuickQuestions ? '▼' : '▲'}
          </button>
        </div>
        
        {showQuickQuestions && (
          <div className="quick-questions-grid">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="quick-question-btn"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        )}
      </div>

      <form className="chatbot-input-form" onSubmit={handleSendMessage}>
        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask me about KodBank services..."
          disabled={isLoading}
          className="chatbot-input"
        />
        <button 
          type="submit" 
          disabled={!inputMessage.trim() || isLoading}
          className="chatbot-send-btn"
          title="Send message"
        >
          {isLoading ? '⏳' : '➤'}
        </button>
      </form>
    </div>
  );
}

export default Chatbot;
