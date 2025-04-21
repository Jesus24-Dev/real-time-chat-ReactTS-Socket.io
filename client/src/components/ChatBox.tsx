import { useState, useEffect } from 'react';
import useSocket from '../hooks/useSocket'; // asegúrate de importar correctamente

interface MessageAttributes {
  username: string;
  message: string;
}

function ChatBox() {
  const { socket } = useSocket();
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<MessageAttributes[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message: MessageAttributes) => {
      setMessageList(prev => [...prev, message]);
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage); // evita duplicados
    };
  }, [socket]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    const user = localStorage.getItem('user');
    if (!user) return;
    const parsedUser = JSON.parse(user);

    const messageData: MessageAttributes = {
      username: parsedUser.username,
      message
    };

    socket?.emit('message', messageData);
    setMessage(''); 
  };

  return (
    <div>
      <input type="text" value={message} onChange={handleChange} />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messageList.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}</strong>: {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatBox;
