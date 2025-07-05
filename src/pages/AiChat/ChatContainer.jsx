import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Box, CircularProgress, IconButton } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import ChatMessage from '../AiChat/ChatMessage';
import ChatInput from '../AiChat/ChatInput';
import ChatHeader from '../AiChat/ChatHeader';
import { motion } from 'framer-motion';
import { AiCahtUrls } from '../../utils/serverURL';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ChatContainer = ({ user }) => {
  const {t} = useTranslation()
  const { rereplace } = useTranslation();
  const lang = localStorage.getItem('lang');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [language, setLanguage] = useState(lang);
  const [chatHistoryId, setChatHistoryId] = useState(null);
  const messagesEndRef = useRef(null);
  const controllerRef = useRef(new AbortController());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const offset = 40;
      const el = messagesEndRef.current;
      el.parentElement?.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const savedHistoryId = localStorage.getItem('chatConversationId');
  const chatHistId = chatHistoryId || savedHistoryId;

  // Fetch chat history
  useEffect(() => {
    if (!chatHistId) return;
    setIsLoadingHistory(true);
    fetch(`${AiCahtUrls.getChat}/${chatHistId}`, {
      headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' },
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        console.log("res in .then in chatId ===> ", res.status)
        if (res.status == 404) {
          localStorage.removeItem('chatConversationId');
          throw new Error(`Status ${res.status}`)
        };
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data.data)) setMessages(data.data);
        else throw new Error('Invalid history format');
      })
      .catch(err => {
        toast.error(t('chat.error_history'));
        console.error(err);
      })
      .finally(() => setIsLoadingHistory(false));
  }, [chatHistId, user.token, t]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userMsg = { role: 'user', content: inputValue, language, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue(''); setIsLoading(true); setIsTyping(true);

    const botPlaceholder = { role: 'model', content: '', language, timestamp: new Date(), isStreaming: true };
    setMessages(prev => [...prev, botPlaceholder]);

    try {
      const response = await fetch(AiCahtUrls.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ message: inputValue, language, chatHistoryId: chatHistId }),
        signal: controllerRef.current.signal,
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Network error');
      if (!response.body) throw new Error('No stream');


      const reader = response.body.getReader();
      const decoder = new TextDecoder(); let buffer = '', botContent = '';

      while (true) {
        const { value, done } = await

 reader.read(); if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n\n'); buffer = parts.pop() || '';
        for (const chunk of parts) {
          if (!chunk.startsWith('data: ')) continue;
          const text = chunk.replace('data: ', '').trim(); if (text === '[DONE]') continue;
          const data = JSON.parse(text);
          // if (data.chatHistoryId) {
            setChatHistoryId(data.chatHistoryId);
            localStorage.setItem('chatConversationId', data.chatHistoryId);
          // }
          if (data.text) {
            botContent += data.text;
            setMessages(prev => prev.map((m,i) => i === prev.length -1 ? { ...m, content: botContent } : m));
          }
        }
      }
      setMessages(prev => prev.map((m,i) => i === prev.length -1 ? { ...m, isStreaming: false } : m));
    } catch (err) {
      if (err.name !== 'AbortError') {
        toast.error(t('chat.chat_error'));
        setMessages(prev => prev.slice(0,-1));
      }
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } };
  const handleAbort = () => {
    controllerRef.current.abort(); controllerRef.current = new AbortController();
    setIsLoading(false);
    setMessages(prev => prev.map((m,i) => i === prev.length -1 ? { ...m, isStreaming: false } : m));
  };

  const handleClearChat = () => {
    setMessages([]);
    setChatHistoryId(null);
    localStorage.removeItem('chatConversationId');
  };

  // Render
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col w-full min-h-full bg-white overflow-hidden my-2">
      <ChatHeader language={language} setLanguage={setLanguage} onClear={handleClearChat} />

      <Box className="flex-1 overflow-y-auto p-4 bg-gray-50 relative">
        {/* History loader */}
        {isLoadingHistory && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <CircularProgress size={60} />
          </div>
        )}

        {/* Messages or empty prompt */}
        {!isLoadingHistory && (
          messages.length === 0 ? (
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="bg-blue-100 rounded-full p-5 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">{t('chat.how_to_help')}</h3>
              <p className="text-gray-500">{t('chat.here_to_answer')}</p>
            </motion.div>
          ) : (
            <div className="space-y-4 pb-8">
              {messages.map((msg, idx) => (
                <motion.div key={idx} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.3}}>
                  <ChatMessage message={msg} isUser={msg.role==='user'} language={language} />
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )
        )}
      </Box>

      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-end">
          <ChatInput value={inputValue} onChange={e=>setInputValue(e.target.value)} onKeyPress={handleKeyPress} language={language} disabled={isLoading} />
          {isLoading ? (
            <motion.div animate={{rotate:360}} transition={{duration:1,repeat:Infinity,ease:'linear'}} className="ml-2">
              <IconButton color="error" onClick={handleAbort} className="bg-red-100 hover:bg-red-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </IconButton>
            </motion.div>
          ) : (
            <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.95}} className="ml-2">
              <IconButton color="primary" onClick={handleSendMessage} disabled={!inputValue.trim()} className="bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100">
                <SendIcon />
              </IconButton>
            </motion.div>
          )}
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">{t('chat.educational_puroses')}</div>
      </div>
    </motion.div>
  );
};

export default ChatContainer;