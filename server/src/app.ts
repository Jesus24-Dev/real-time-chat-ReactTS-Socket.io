import express, {Request, Response} from 'express'
import {Server} from 'socket.io'
import http from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import { socketAuth } from './sockets/socketAuth'
import { socketConnect } from './sockets/socketConnect'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
})

socketAuth(io)
socketConnect(io);

app.get('/api/hello', (req: Request, res: Response) => {
    res.status(200).json({message: "hello world from backend"})
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

export default server;