import {useState, useEffect} from 'react'
import RoomData from "../../types/roomDataType";
import FormField from "../ui/FormField"
import useSocket from '../../hooks/useSocket';

export default function CreateRoomForm(){

    const [formData, setFormData] = useState<RoomData>({id_admin: 0, roomName: '', description: ''})
    const { socket } = useSocket();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {id_admin, roomName, description} = formData
        const response = await fetch('http://localhost:3030/api/room/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_admin, roomName, description}),
        })
        const data = await response.json();
        if(data.status === 'success'){
            socket?.emit('created_room')
            setFormData((prevData) => ({...prevData, roomName: '', description: ''}))
        } else if (data.status === 'error'){
            console.log(data.error)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({...prevData, [name]: value}))
    }

    useEffect(() => {
        const user = localStorage.getItem('user');

        if (user){
            const parsedUser = JSON.parse(user)
            setFormData((prevData) => ({...prevData, id_admin: parsedUser.id}))
        }
    }, [])

    return (
        <>
        <h1>Create new room</h1>
            <form onSubmit={handleSubmit}>
                <input type="hidden" value={formData.id_admin}/>
                <FormField label="Room Name" type="text" name="roomName" value={formData.roomName} onChange={handleChange}/>
                <FormField label="Description" type="text" name="description" value={formData.description} onChange={handleChange}/>
                <button type='submit'>Create room</button>
            </form>
        </>
    )
}