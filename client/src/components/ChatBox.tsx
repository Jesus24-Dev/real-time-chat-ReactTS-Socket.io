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
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  useEffect(() => {
    const roomId = localStorage.getItem('roomId');
    setCurrentRoom(roomId);
    
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
  }, [socket]);

  const sendMessage = () => {
    if (!currentRoom) {
      console.error('No hay sala seleccionada');
      return;
    }

    const user = localStorage.getItem('user');
    if (!user) return;

    const parsedUser = JSON.parse(user);
    const messageData: MessageAttributes = {
      username: parsedUser.username,
      message
    };

    console.log('Enviando mensaje a sala:', currentRoom);
    socket?.emit('send_message', currentRoom, messageData);
    setMessage('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
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
