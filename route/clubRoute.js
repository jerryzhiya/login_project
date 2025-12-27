import express from 'express';
import { ensureAuthenticated } from '../middleware/auth.js';
import { getJoinClub, postJoinClub, getAdminPage, postAdminPage } from '../controller/clubController.js';

const route = express.Router();

route.get('/join', ensureAuthenticated, getJoinClub);
route.post('/join', ensureAuthenticated, postJoinClub);

route.get('/admin', ensureAuthenticated, getAdminPage);
route.post('/admin', ensureAuthenticated, postAdminPage);

export default route;