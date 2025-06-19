import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import {AiCahtUrls} from '../utils/serverURL'

const Chat = ({ userId }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistoryId, setChatHistoryId] = useState(null);
  const [language, setLanguage] = useState('en'); // Default to English
  const messagesEndRef = useRef(null);


  // Fetch chat history when chatHistoryId changes
  useEffect(() => {
    if (chatHistoryId) {
      fetchChatHistory(chatHistoryId);
    }
  }, [chatHistoryId]);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchChatHistory = async (id) => {
    try {
      const response = await axios.get(`${AiCahtUrls.getChats}${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessages(response.data);
    } catch (error) {
      toast.error(t('Failed to fetch chat history'));
      console.error('Error fetching chat history:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input, language };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        AiCahtUrls.create,
        { message: input, language, userId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      // If new chat, set chatHistoryId from response
      if (!chatHistoryId && response.data.chatHistoryId) {
        setChatHistoryId(response.data.chatHistoryId);
      }

      const eventSource = new EventSource(response.data.url || `/api/chat/${response.data.chatHistoryId}`);
      let botMessage = { role: 'model', content: '', language };
      setMessages((prev) => [...prev, botMessage]);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.text) {
          botMessage.content += data.text;
          setMessages((prev) => [...prev.slice(0, -1), { ...botMessage }]);
        } else if (data === '[DONE]') {
          eventSource.close();
          setIsLoading(false);
        } else if (data.error) {
          toast.error(t(data.error));
          eventSource.close();
          setIsLoading(false);
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
        setIsLoading(false);
        toast.error(t('Streaming error occurred'));
      };
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      toast.error(t('Failed to send message'));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-green-50 p-4 font-['Cairo',_'Abel']">
      {/* Chat Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          {t('Chat with a Caring Doctor')}
        </h1>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-2 p-1 rounded-md bg-white shadow-sm text-gray-700"
        >
          <option value="en">{t('English')}</option>
          <option value="ar">{t('Arabic')}</option>
        </select>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-200 text-gray-800'
                    : 'bg-green-100 text-gray-700'
                } ${language === 'ar' ? 'text-right' : 'text-left'}`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="p-3 rounded-lg bg-green-100 text-gray-700">
              <span className="animate-pulse">{t('Typing')}...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white rounded-t-lg shadow-md">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('Type your message...')}
          className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          rows="2"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="mt-2 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          {t('Send')}
        </button>
      </div>
    </div>
  );
};

export default Chat;