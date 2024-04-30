import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChatById, setMessageChat } from '../store/slices/ChatSlice';
import { getChatData, getChats } from '../service/ChatService';

const ChatContext = createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

export function ChatContextProvider({ children }) {
  const dispatch = useDispatch();

  const getDataChats = async (data) => {
    try {
      let response = await getChats(data);

      dispatch(
        setMessageChat({
          messagechat: response.data,
        })
      );
    } catch (error) {
      
    }
  };

  const getMessageId = async (id, data) => {
    try {
      let response2 = await getChatData(id, data);

      dispatch(
        setChatById({
          messageId: response2.data,
        })
      );

    } catch (error) {
      console.log(error.response2);
    }
  };

  const allChats = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(
      setChatById({
        messageId: [],
      })
    );
  }, [window.location.pathname]);

  // Добавим функции напрямую в объект контекста
  const chatContextValue = {
    getDataChats,
    getMessageId,
    allChats,
  };

  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContextProvider;
