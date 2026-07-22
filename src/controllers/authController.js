import { Router } from 'express';
import authService from '../services/authServices.js';
import { registerSchema, loginSchema } from '../validations/authValidation.js';

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('register');
});

authController.post('/register', async (req, res) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        const errorMessage = result.error.issues[0].message;

        return res.status(400).render('register', {
            error: errorMessage
        });
    }

    try {
        const { username, email, password } = result.data;

        const token = await authService.register({
            username,
            email,
            password
        });

        res.cookie('auth', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.redirect('/');
    } catch (error) {
        return res.status(400).render('register', {
            error: error.message
        });
    }
});

authController.get('/login', (req, res) => {
    res.render('login');
});

authController.post('/login', async (req, res) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
    const errorMessage = result.error.issues[0].message;

    return res.status(400).render('login', {
        error: errorMessage
    });
    }

    const { email, password } = result.data;
    
    try {

        const token = await authService.login({
            email,
            password
        });

        res.cookie('auth', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.redirect('/');
    } catch (error) {
        return res.status(400).render('login', {
            error: error.message
        });
    }
});

export default authController;