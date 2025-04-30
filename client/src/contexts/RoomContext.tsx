import { createContext } from 'react';

export interface RoomContextType {
  roomId: string | null;
  updateRoomId: (roomId: string) => void;
}

export const RoomContext = createContext<RoomContextType | null>(null);


