import { Router } from "express";
const router = Router();
import { registerUser, loginUser, getAllUsers } from '../controllers/auth'

router.post('/register',  registerUser);
router.post('/login',  loginUser);
router.get('/get',getAllUsers)

export default router