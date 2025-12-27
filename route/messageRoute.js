import express from 'express';
import { ensureAuthenticated, ensureAdmin } from '../middleware/auth.js';
import { getMessages, postMessage, deleteMessages } from '../controller/messageController.js';

const route = express.Router();
route.get('/new', ensureAuthenticated, getMessages);
route.post('/new', ensureAuthenticated, postMessage);
route.post('/delete/:id', ensureAdmin, deleteMessages);
export default route;