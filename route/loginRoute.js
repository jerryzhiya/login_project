// routes/login.js
import express from 'express';
import { getLogin, postLogin, logout } from '../controller/loginController.js';

const router = express.Router();

router.get('/log-in', getLogin);
router.post('/log-in', postLogin);
router.get('/log-out', logout);

export default router;