import MessageAttributes from "../types/messageType"

export function socketRoom(socket: any, io: any) {
    socket.on('join_room', (roomId: string, userId?: number) => { // Cambiado a string
        console.log(`Usuario ${userId} uniéndose a sala ${roomId}`);
        socket.join(roomId);
    });

    socket.on('leave_room', (roomId: string, userId: number) => { // Cambiado a string
        socket.leave(roomId);
    });

    socket.on('created_room', () => {
        io.emit('room_created')
    })

    socket.on('send_message', (roomId: string, message: MessageAttributes) => { // Cambiado a string
        console.log(`Mensaje recibido en sala ${roomId}:`, message);
        io.to(roomId).emit('receive_message', message);
    });
}