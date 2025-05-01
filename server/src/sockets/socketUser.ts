export function socketUser(socket: any, io: any) {
    socket.on('add_contact', () => {
        io.emit('update_contact')
    })
}