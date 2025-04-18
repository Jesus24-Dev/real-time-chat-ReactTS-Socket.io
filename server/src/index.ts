import express, {Request, Response} from 'express'
import {Server} from 'socket.io'
import http from 'http'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

app.get('/api/hello', (req: Request, res: Response) => {
    res.status(200).json({message: "hello world from backend"})
})

const PORT = process.env.PORT || 3030

server.listen(PORT, () => {
    console.log(`Server active on port ${PORT}`)
} )