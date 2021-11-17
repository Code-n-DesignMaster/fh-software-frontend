import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from 'src/socket';
import { messageService, authService } from 'src/services';
import {
  getCountTotalNotRead,
  getCountSystemNotRead,
  setCountOfSystemMessage
} from '@redux/message/actions';
import { RootState } from '@redux/store';

const useNotifications = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.current);
  const [messages, setMessages] = useState([]);

  const onLogout = async () => {
    const token = authService.getToken();
    if (token) {
      await socket?.emit('auth/logout', {
        token
      });
    }
    socket?.close();
  };

  const handleMessage = () => {
    dispatch(getCountTotalNotRead());
  };

  const handleSystemMessages = () => {
    dispatch(getCountSystemNotRead());
  };

  const getSystemMessages = async () => {
    const readAllMessages = await messageService.readAllInSystemMessage(
      currentUser._id,
      Boolean(currentUser.isPerformer)
    );
    dispatch(setCountOfSystemMessage({ total: 0 }));
    setMessages(readAllMessages.data.data || []);
  };

  useEffect(() => {
    socket?.on('nofify_read_messages_in_conversation', handleMessage);
    socket?.on('nofify_send_tip_system_messages', handleSystemMessages);

    return () => {
      socket?.off('nofify_read_messages_in_conversation', handleMessage);
      socket?.off('nofify_send_tip_system_messages', handleSystemMessages);
    };
  }, []);

  return {
    messages,
    onLogout,
    getSystemMessages
  };
};

export default useNotifications;
