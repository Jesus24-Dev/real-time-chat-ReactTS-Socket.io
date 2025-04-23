import {useState, useEffect} from 'react'
import RoomData from "../../types/roomDataType";
import useSocket from '../../hooks/useSocket';

export default function RoomList() {
    const [room, setRoom] = useState<RoomData[]>([])
    const { socket } = useSocket();

    useEffect(() => {
        const fetchRooms = async () => {
            const response = await fetch('http://localhost:3030/api/room/all')
            const data = await response.json()
            if (data.status === 'success') {
                setRoom(data.rooms)
            } else if (data.status === 'error') {
                console.log(data.error)
            }
        }
        
        if (socket) {
            socket.on('room_created', fetchRooms);

            return () => {
                socket.off('room_created', fetchRooms);
            };
        }     
        fetchRooms()
    }, [socket])

    return (
        <div>
            {room.length > 0  ? (
                <ul>
                    {room.map((r) => (
                        <li key={r.id}>
                            <h2>{r.roomName}</h2>
                            <p>{r.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No rooms to show.</p>
            )}
        </div>
    );
}

