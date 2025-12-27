import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import session from 'express-session';
import passport from './config/passport.js';
import flash from 'connect-flash';
import signupRoute from './route/signupRoute.js';
import loginRoute from './route/loginRoute.js';
import messageRoute from './route/messageRoute.js';
import clubRoute from './route/clubRoute.js'
import Messages from './model/message.js';
import { ensureAuthenticated } from './middleware/auth.js';
import expressEjsLayouts from 'express-ejs-layouts';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallbackSecret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(expressEjsLayouts);

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', signupRoute);
app.use('/auth', loginRoute);
app.use('/messages', messageRoute);
app.use('/club', clubRoute);

app.get('/', ensureAuthenticated, async (req, res, next) => {
  try {
    const result = await Messages.findAll();   // ✅ now result is defined

    res.render('index', {
      title: 'Home',
      user: req.user,
      posts: result.rows,                      // ✅ safe to use
      success_msg: req.flash('success'),
      error_msg: req.flash('error')
    });
  } catch (err) {
    next(err);
  }
});

// Example protected route
// app.get('/dashboard', ensureAuthenticated, (req, res) => {
//   res.render('dashboard', { user: req.user });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});