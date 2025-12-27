// controllers/loginController.js
import passport from 'passport';

export const getLogin = (req, res) => {
  res.render('log-in', {
    title: 'Login',
    user: req.user,
    success_msg: res.locals.success_msg,
    error_msg: res.locals.error_msg
  });
};

export const postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/log-in',
  failureFlash: true,
  successFlash: 'Welcome back'
});

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};