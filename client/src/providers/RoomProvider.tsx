import { useState, ReactNode } from 'react';
import { RoomContext } from '../contexts/RoomContext';

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [roomId, setRoomId] = useState<string | null>(null);

  const updateRoomId = (newRoomId: string) => {
    setRoomId(newRoomId);
  };

  return (
    <RoomContext.Provider value={{ roomId, updateRoomId }}>
      {children}
    </RoomContext.Provider>
  );
};