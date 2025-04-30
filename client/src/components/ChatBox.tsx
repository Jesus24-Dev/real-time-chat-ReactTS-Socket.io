import { useState, useEffect } from 'react';
import useSocket from '../hooks/useSocket'; // asegúrate de importar correctamente
import Button from './ui/Button';
import MessageAttributes from '../types/messageType';
import Message from './ui/Message';
import FormField from './ui/FormField';
import { useRoom } from '../hooks/useRoom';

export default function ChatBox() {
  const { socket } = useSocket();
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<MessageAttributes[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const { roomId } = useRoom();

  useEffect(() => {

    if (!socket || !roomId) return;

    // Verificar unión a la sala
    socket.emit('join_room', roomId);

    const handleMessage = (message: MessageAttributes) => {
      console.log('Mensaje recibido:', message);
      setMessageList(prev => [...prev, message]);
    };

    socket.on('receive_message', handleMessage);

    return () => {
      socket.off('receive_message', handleMessage);
    };
  }, [socket, roomId]);

  const sendMessage = () => {
    if (!roomId) {
      console.error('No hay sala seleccionada');
      return;
    }

    const user = localStorage.getItem('user');
    if (!user) return;

    const parsedUser = JSON.parse(user);
    setCurrentUser(parsedUser.username)
    const messageData: MessageAttributes = {
      username: parsedUser.username,
      message
    };

    console.log('Enviando mensaje a sala:', roomId);
    socket?.emit('send_message', roomId, messageData);
    setMessage('');
  };

  useEffect(() => {
    const container = document.querySelector('.overflow-y-auto');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messageList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden h-96">
      {/* Chat Header */}
      <div className="bg-amber-500 px-4 py-3 flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-white mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" 
            clipRule="evenodd" 
          />
        </svg>
        <h3 className="text-white font-semibold">
          {roomId ? `Room: ${roomId}` : "Select a room to chat"}
        </h3>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
        {messageList.length > 0 ? (
          messageList.map((msg, index) => (
            <Message 
              key={index} 
              username={msg.username} 
              message={msg.message} 
              isCurrentUser={msg.username === currentUser} 
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 mb-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-2">
          <div className="flex-1">
            <FormField 
              label="" 
              type="text" 
              name="message" 
              value={message} 
              onChange={handleChange}
            />
          </div>
          <Button 
            label="Send" 
            type="button" 
            disabled={!message.trim()} 
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

