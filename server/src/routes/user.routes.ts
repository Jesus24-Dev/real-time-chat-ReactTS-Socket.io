import {Router} from 'express'
import { getUser, getUserRooms } from '../controllers/user.controller';

const router = Router();

router.get('/me/:userId', getUser)
router.get('/userRooms/:userId', getUserRooms)

export default router;