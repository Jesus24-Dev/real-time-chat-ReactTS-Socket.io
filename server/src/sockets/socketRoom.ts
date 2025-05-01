import MessageAttributes from "../types/messageType"
import {PrivateMessage} from '../models/relations'

export function socketRoom(socket: any, io: any) {
    socket.on('join_room', (roomId: string, userId?: number) => { 
        console.log(`Usuario ${userId} uniéndose a sala ${roomId}`);
        socket.join(roomId);
        io.emit('room_created', roomId);
    });

    socket.on('leave_room', (roomId: string, userId: number) => { 
        socket.leave(roomId);
    });

    socket.on('created_room', () => {
        io.emit('room_created')
    })

    socket.on('send_message', (roomId: string, message: MessageAttributes) => {
        console.log(`Mensaje recibido en sala ${roomId}:`, message);
        io.to(roomId).emit('receive_message', message);
    });

    socket.on('private_message', async (senderId: string, receiverId: string, content: string) => {
        const message = {
            senderId,
            receiverId,
            content,
        };
    
        io.to(receiverId).emit('receive_private_message', message);
        io.to(senderId).emit('receive_private_message', message);
    
        try {
            await PrivateMessage.create({ senderId, receiverId, content });
        } catch (err) {
            console.error('Error al guardar mensaje privado:', err);
        }
    });
    
}