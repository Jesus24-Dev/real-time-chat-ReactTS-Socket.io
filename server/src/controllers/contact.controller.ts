import {Request, Response} from 'express'
import {Contact} from "../models/relations";

export async function createContact(req: Request, res: Response){
    const {id_user, id_contact} = req.body;
        try {
            if (!id_user || !id_contact) {
                res.status(400).json({ status: 'error', error: 'id_user and id_contact are required' });
                return;
            }
            const contactCreated = await Contact.create({
                id_user: id_user,
                id_contact: id_contact
            })

            await Contact.create({
                id_user: id_contact,
                id_contact: id_user
            })
            res.status(201).json({status: 'success', message: 'Contact created successfully', contact: contactCreated})    
        } catch (e) {
            res.status(400).json({status: 'error', error: e})
        }      
    }

export async function getAllContacts(req: Request, res: Response){
    const {id_user} = req.params;
    try {
        const contacts = await Contact.findAll({
            where: {
                id_user: id_user
            }
        })
        res.status(200).json({status: 'success', contacts})
    } catch (e){
        res.status(400).json({status: 'error', error: e})
    }
}