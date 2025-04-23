import {Request, Response} from 'express'
import {Room} from "../models/relations";

export async function createRoom(req: Request, res: Response): Promise<void>{
    const {id_admin, roomName, description} = req.body;
    try {

        if (!id_admin) {
            res.status(400).json({ status: 'error', error: 'id_admin is required' });
            return;
        }
        const roomCreated = await Room.create({
            id_admin: id_admin,
            roomName: roomName,
            description: description
        })
        res.status(201).json({status: 'success', message: 'Room created successfully', room: roomCreated})    
    } catch (e) {
        res.status(400).json({status: 'error', error: e})
        console.log(e)
        return;
    }
}

export async function getAllRooms(req: Request, res: Response): Promise<void>{
    try {
        const rooms = await Room.findAll()
        res.status(200).json({status: 'success', rooms})
    } catch (e){
        res.status(400).json({status: 'error', error: e})
        return;
    }
}