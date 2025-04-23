import {useState, useEffect} from 'react'
import RoomData from "../../types/roomDataType";
import useSocket from '../../hooks/useSocket';

export default function UserRoomList(){
    const [room, setRoom] = useState<RoomData[]>([])
    const [userId, setUserId] = useState<number | null>(null)
    const {socket} = useSocket()

    useEffect(() => {
        const user = localStorage.getItem('user');
        const userId = user ? JSON.parse(user).id : null;

        if(!userId){
            console.error('User ID not found in local Storage')
        }

        setUserId(userId)

        const fetchRooms = async () => {
            try {
                const response = await fetch(`http://localhost:3030/api/user/userRooms/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRoom(data.rooms);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        if (socket) {
            socket.on('room_created', fetchRooms);

            return () => {
                socket.off('room_created', fetchRooms);
            };
        }     

        fetchRooms();
    }, [socket])

    const joinRoom = (roomId: number | undefined) => {
        if (roomId){
            const roomIdStr = roomId.toString();
            localStorage.setItem('roomId', roomIdStr);
            socket?.emit('join_room', roomIdStr, userId);
            console.log(`Uniéndose a sala: ${roomIdStr}`);
        } 
    }

    return (
        <div>
            <h2>Your Rooms</h2>
            {room.length > 0 ? (
                <ul>
                    {room.map((r) => (
                        <li key={r.id}>
                            <h3>{r.roomName}</h3>
                            <p>{r.description}</p>
                            <button onClick={() => joinRoom(r.id)}>Join room</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no rooms.</p>
            )}
        </div>
    )
}