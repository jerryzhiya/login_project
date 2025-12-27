import express from 'express';
import db from '../db/pool.js';
const route = express.Router();

route.get('/join', (req, res) => {
  res.render('join-club', { title: 'Join the club', user: req.user });
});

route.post('/join', async (req, res, next) => {
  try {
    const { passcode } = req.body;
    if (passcode !== process.env.CLUB_PASSCODE) {
      req.flash('error', 'Incorrect passcode');
      return res.redirect('/club/join');
    }
    await db.query('UPDATE users SET is_member = TRUE WHERE id = $1', [req.user.id]);
    req.flash('success', 'Welcome to the club!');
    res.redirect('/');
  } catch (err) { next(err); }
});

// Optional admin elevation
route.get('/admin', (req, res) => res.render('admin-passcode', { title: 'Admin access', user: req.user }));
route.post('/admin', async (req, res, next) => {
  try {
    const { passcode } = req.body;
    if (passcode !== process.env.ADMIN_PASSCODE) {
      req.flash('error', 'Incorrect admin passcode');
      return res.redirect('/club/admin');
    }
    await db.query('UPDATE users SET is_admin = TRUE WHERE id = $1', [req.user.id]);
    req.flash('success', 'Admin rights granted');
    res.redirect('/');
  } catch (err) { next(err); }
});

export default route;