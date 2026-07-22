import { Router } from "express";

import blogService from "../services/blogServices.js";
import { blogSchema } from "../validations/blogValidation.js";

const blogController = Router();

blogController.get('/blogs', async (req, res) => {
    try {
        const blogs = await blogService.getAll();

        return res.render('catalog', {
            blogs
        });
    } catch (error) {
        return res.status(500).send('Something went wrong.')
    }
})

blogController.get('/blogs/create', (req, res) => {
    if(!req.user) {
        return res.redirect('/login')
    }

    res.render('create')
});

blogController.post('/blogs/create', async (req, res) => {
    if(!req.user) {
        return res.redirect('/login')
    }

    const result = blogSchema.safeParse(req.body);

    if(!result.success) {
        const errorMessage = result.error.issues[0].message;

        return res.status(400).render('create', {
            error: errorMessage
        });

    }

    try {
        await blogService.create(
            result.data,
            req.user.userId
        );

        return res.redirect('/')
    } catch (error) {
        return res.status(400).render('create', {
            error: error.message
        });
    }
});

export default blogController;