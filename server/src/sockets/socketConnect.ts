import {Socket} from 'socket.io'
import { socketRoom } from './socketRoom';

interface MessageAttributes {
    username: string;
    message: string;
}

export function socketConnect(io: any){
    io.on('connection', (socket: Socket) => {        
        socketRoom(socket, io);
        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id)
        })
    })
}