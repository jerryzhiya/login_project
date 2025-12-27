// routes/auth.js
import express from 'express';
import { getSignUp, postSignUp } from '../controller/signupController.js';
import { body, validationResult } from 'express-validator';
import { render } from 'ejs';

const router = express.Router();

router.get('/sign-up', getSignUp);
router.post('/sign-up', postSignUp);

router.get('/', (req, res) => {
    res.render('index', {
        title: 'logout',
        user: req.user,
        success_msg: req.flash('success'),
        error_msg: req.flash('error')
    });
});

router.post('/sign-up', 
    [
        body('firstname')
        .notEmpty().withMessage('First name required'),
        body('lastname')
        .notEmpty().withMessage('Lastname is required'),
        body('email')
        .notEmpty().isEmail('Please enter a valid email'),
        body('username')
        .isLength({min: 4}).withMessage('Username must be at least 4 characters'),
        body('password')
        .isLength({min: 6}).withMessage('Password must at least be characters')
    ],
    (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty())
            return render('signup', {
        errors: error.array(),
        user: req.user,
        FormData: req.body
    });
    }
)

export default router;