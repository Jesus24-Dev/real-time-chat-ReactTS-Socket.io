import {Socket} from 'socket.io'

interface MessageAttributes {
    username: string;
    message: string;
}

export function socketConnect(io: any){
    io.on('connection', (socket: Socket) => {
        console.log('User connected', socket.id)
        
        socket.on('message', (message: MessageAttributes) => {
            io.emit('message', message) 
        }) 

        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id)
        })
    })
}