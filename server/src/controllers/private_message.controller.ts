import {Request, Response} from 'express'
import {Op} from 'sequelize'
import {PrivateMessage} from '../models/relations'

export async function sendPrivateMessage(req: Request, res: Response) {
    const { senderId, receiverId, content } = req.body;
    try {
      const message = await PrivateMessage.create({ senderId, receiverId, content });
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: 'Error sending message' });
    }
}

export async function getPrivateChat(req: Request, res: Response): Promise<void> {
    const { userId1, userId2 } = req.params;
    try {
      const messages = await PrivateMessage.findAll({
        where: {
          [Op.or]: [
            { senderId: userId1, receiverId: userId2 },
            { senderId: userId2, receiverId: userId1 }
          ]
        },
        order: [['createdAt', 'ASC']]
      });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching chat' });
    }
  }