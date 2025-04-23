import {Router} from 'express'
import {createRoom, getAllRooms} from '../controllers/room.controller'

const router = Router();

router.post('/create', createRoom);
router.get('/all', getAllRooms);

export default router;