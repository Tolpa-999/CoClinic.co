import React, { useState, useEffect, useRef } from 'react';
import { Box, CircularProgress, IconButton } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import ChatMessage from '../AiChat/ChatMessage';
import ChatInput from '../AiChat/ChatInput';
import ChatHeader from '../AiChat/ChatHeader';
import { motion } from 'framer-motion';
import axios from 'axios';

import {AiCahtUrls} from '../../utils/serverURL'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ChatContainer = ({ user }) => {
  const {t} = useTranslation()
    const lang = localStorage.getItem("lang")
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [language, setLanguage] = useState(lang);
  const [chatHistoryId, setChatHistoryId] = useState(null);
  const messagesEndRef = useRef(null);
  const controllerRef = useRef(new AbortController());


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const scrollToBottom = () => {
  if (messagesEndRef.current) {
    const offset = 40; // scroll a little bit above the exact bottom
    const element = messagesEndRef.current;
    const scrollContainer = element.parentElement;

    scrollContainer?.scrollTo({
      top: element.offsetTop - offset,
      behavior: 'smooth',
    });
  }
};


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

    const chatIdLocalStorage = localStorage.getItem("ChatBot")

  

  const ChatHistoryFromBoth = chatHistoryId || chatIdLocalStorage

useEffect(() => {
  if (ChatHistoryFromBoth) {
    setIsLoadingHistory(true);
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`${AiCahtUrls.getChats}/${ChatHistoryFromBoth}`, {
          headers: { 
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          },
          method: "GET",
          credentials: "include"
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response
        console.log('messages ======>', data);
        if (Array.isArray(data.data)) {
  setMessages(data.data);
} else {
  toast.error(t('chat.expected'), data);
  console.error(t('chat.expected'), data);
}
      } catch (error) {
        toast.error(t('chat.error_history'), error);
        console.error(t('chat.error_history'), error);
      } finally {
        setIsLoadingHistory(false);
      }
    };
    fetchChatHistory();
  }
}, [ChatHistoryFromBoth, user.token]);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputValue,
      language,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    const botMessage = {
      role: 'model',
      content: '',
      language,
      timestamp: new Date(),
      isStreaming: true
    };
    setMessages(prev => [...prev, botMessage]);

    try {
      const response = await fetch(AiCahtUrls.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ 
          message: inputValue, 
          language,
          chatHistoryId: ChatHistoryFromBoth
        }),
        signal: controllerRef.current.signal,
        credentials: "include"
      });

      if (!response.ok) throw new Error('Network response was not ok');
      if (!response.body) throw new Error('ReadableStream not supported');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let responseText = '';
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        
        const events = buffer.split('\n\n');
        buffer = events.pop() || '';
        
        for (const event of events) {
          if (!event.trim()) continue;
          
          if (event.startsWith('data: ')) {
            const dataString = event.replace('data: ', '');
            
            if (dataString.trim() === '[DONE]') continue;
            
            try {
              const data = JSON.parse(dataString);
              if (data.chatHistoryId) {
                setChatHistoryId(data.chatHistoryId);
                console.log("chatHistory ====>", data.chatHistoryId)
                localStorage.setItem("ChatBot", data.chatHistoryId)
              }
              if (data.text) {
                responseText += data.text;
                setMessages(prev => prev?.map((msg, i) => 
                  i === prev.length - 1 
                    ? { ...msg, content: responseText } 
                    : msg
                ));
              }
            } catch (parseError) {
              console.error(t('chat.error_parsing'), parseError, dataString);
              toast.error(t('chat.error_parsing'), parseError, dataString);
            }
          }
        }
      }

      setMessages(prev => prev?.map((msg, i) => 
        i === prev.length - 1 
          ? { ...msg, isStreaming: false } 
          : msg
      ));

    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error(t('chat.chat_error'), error?.message);
        toast.error(t('chat.chat_error'), error?.message);
        setMessages(prev => prev?.slice(0, -1));
      }
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAbort = () => {
    controllerRef.current.abort();
    controllerRef.current = new AbortController();
    setIsLoading(false);
    setMessages(prev => prev?.map((msg, i) => 
      i === prev.length - 1 
        ? { ...msg, isStreaming: false } 
        : msg
    ));
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col w-full min-h-full bg-white overflow-hidden my-2"
    >
      <ChatHeader 
        language={language}
        setLanguage={setLanguage}
        onClear={() => {
          setMessages([]);
          setChatHistoryId(null);
        }}
      />
      
      <Box className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages?.length == 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center h-full text-center p-8"
          >
            <div className="bg-blue-100 rounded-full p-5 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              {t('chat.how_to_help')}
            </h3>
            <p className="text-gray-500">
              {t('chat.how_to_answer')}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4 pb-8">
            {messages?.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChatMessage 
                  message={message} 
                  isUser={message.role === 'user'} 
                  language={language}
                />
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </Box>

      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-end">
          <ChatInput 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            language={language}
            disabled={isLoading}
          />
          
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="ml-2"
            >
              <IconButton 
                color="error" 
                onClick={handleAbort}
                className="bg-red-100 hover:bg-red-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </IconButton>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2"
            >
              <IconButton 
                color="primary" 
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100"
              >
                <SendIcon />
              </IconButton>
            </motion.div>
          )}
        </div>
        
        <div className="mt-2 text-xs text-gray-500 text-center">
          {t('chat.educational_puroses')}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatContainer;