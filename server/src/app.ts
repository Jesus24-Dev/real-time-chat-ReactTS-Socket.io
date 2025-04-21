import express, {Request, Response} from 'express'
import {Server} from 'socket.io'
import http from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

app.get('/api/hello', (req: Request, res: Response) => {
    res.status(200).json({message: "hello world from backend"})
})

app.use('/auth', authRouter)
app.use('/user', userRouter)

export default server;