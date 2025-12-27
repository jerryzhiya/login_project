import User from '../model/user.js';

export const getSignUp = (req, res) => {
  res.render('sign-up', {
    title: 'Signup',
    user: req.user,
    success_msg: res.locals.success_msg,
    error_msg: res.locals.error_msg,
    errors: [],
    formData: {}
  }); 
};

export const postSignUp = async (req, res, next) => {
  try {
    const { firstname, lastname, email, username, password } = req.body;

    // Basic validation
    if (!firstname || !lastname || !email || !username || !password) {
      req.flash('error', 'All fields are required');
      return res.redirect('/auth/sign-up');
    }

    // Check if email already exists
    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      req.flash('error', 'Email already registered');
      return res.redirect('/auth/sign-up');
    }

    // Check if username already exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      req.flash('error', 'Username already taken');
      return res.redirect('/auth/sign-up');
    }

    // Create new user with membership/admin flags set to false
    await User.create(firstname, lastname, email, username, password, false, false);

    req.flash('success', 'Account created successfully. Please log in.');
    res.redirect('/auth/log-in');
  } catch (err) {
    next(err);
  }
};