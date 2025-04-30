import {useState, useEffect} from 'react'
import Button from '../ui/Button';

type JoinRoomButtonProps = {
    roomId: number | undefined;  
}

export default function JoinRoomButton({roomId}: JoinRoomButtonProps) {

    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const userId = user ? JSON.parse(user).id : null;

        if(userId){
            setUserId(userId);
        } else {
            console.error('User ID not found in local Storage')
        }
    }, [])

    const handleOnClick = () => {
        if(userId){
            fetch(`http://localhost:3030/api/room/joinRoom`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_user: userId,
                    id_room: roomId
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.status === 'success'){
                    console.log('User added to room successfully')
                } else {
                    console.error(data.error || 'An error occurred')
                }
            })
        } else {
            console.error('User ID not found')
        }
    }

    return (
        <>
            <Button type="button" label="Join" disabled={false} onClick={handleOnClick} />
        </>
    );
}

