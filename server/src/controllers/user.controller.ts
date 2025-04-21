import {Request, Response} from 'express'
import User from "../models/User";

export async function getUser(req: Request, res: Response): Promise<void>{
    const {userId} = req.params;
    try {
        const user = await User.findByPk(userId)
        if(!user){  
            res.status(404).json({error: "User not found"})
            return;
        }
        res.status(200).json({user})
    } catch(e){
        res.status(400).json({error: e})
    }
}