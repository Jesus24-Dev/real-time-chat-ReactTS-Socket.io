import {Request, Response} from 'express'
import User from "../models/User";

export async function createUser(req: Request, res: Response): Promise<void>{
    const {username, email, password} = req.body;

    try {
        const userCreated = await User.create({
            username,
            email,
            password
        })
        res.status(201).json(userCreated)
    } catch(e){
        res.status(400).json({error: e})
    }
}