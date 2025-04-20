import express, {Request, Response} from 'express'
import {Server} from 'socket.io'
import http from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/user.routes'
import sequelize from './database/database'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const database = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Conexión a la base de datos establecida correctamente.');
      } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
      }
}

database();

app.get('/api/hello', (req: Request, res: Response) => {
    res.status(200).json({message: "hello world from backend"})
})

app.use('/users', userRouter)

export default server;