import React from 'react';
import { Container } from '@mui/material';
import { motion } from 'framer-motion';
import ChatContainer from '../AiChat/ChatContainer';
import { useSelector } from 'react-redux';

const ChatPage = () => {
//   const { userInfo } = useSelector(state => state?.auth || {
//     Token: "pla pla pla"
//   });
  

    const userInfo = {
        token: "pla pla pla"
    }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-2"
    >
      {/* <Container maxWidth="lg" className="h-[90vh] w-[100vw]"> */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="h-full"
        >
          <ChatContainer user={userInfo} />
        </motion.div>
      {/* </Container> */}
    </motion.div>
  );
};

export default ChatPage;