import {useState, useEffect} from 'react'
import { io, Socket } from "socket.io-client";

export default function useSocket(){
    const [socket, setSocket] = useState<Socket | null>(null)
    const [token, setToken] = useState<string | null>('')

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        const newSocket = io("http://localhost:3030", {
            auth: {
                token
            }
        })
        setSocket(newSocket)

        return () => {
            newSocket.disconnect();
        }
    }, [token])

    return { socket }
}