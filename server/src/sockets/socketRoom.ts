export function socketRoom(socket: any, io: any){
    socket.on('join_room', (roomId: number, userId: number) => {
        socket.join(roomId.toString())
    })

    socket.on('leave_room', (roomId: number, userId: number) => {
        socket.leave(roomId.toString())
    })

    socket.on('created_room', () => {
        io.emit('room_created')
    })

    socket.on('send_message', (roomId: number, message: string) => {
        socket.to(roomId.toString()).emit('receive_message', message)
    })
}