import express from 'express';
import hbs from 'express-hbs';
import { registerSchema } from './src/validations/authValidation.js';
import bcrypt from 'bcrypt';
import { prisma } from './src/config/prisma.js';
import { hash } from 'zod';


const app = express();
const PORT = 5000;

app.engine('hbs', hbs.express4( {
    defaultLayout: './src/views/layouts/main.hbs'
}))
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const result = registerSchema.safeParse(req.body);

    if(!result.success) {
        console.log(result.error);
        return  
    }

    const { username, email, password } = result.data;

    const existingUser = await prisma.user.findUnique({
    where: {
        email
    }
    });

    if (existingUser) {
    console.log('Email already exists');
    return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    });

    res.redirect('/')
})

app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
    
})
