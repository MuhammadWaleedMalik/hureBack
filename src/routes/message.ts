import { Router } from "express";
const router = Router();
import { registerUser, loginUser } from '../controllers/auth'

router.post('/send', registerUser);
router.get('/get',  loginUser);

export default router