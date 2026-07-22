import 'dotenv/config';

import express from 'express';
import hbs from 'express-hbs';
import cookieParser from 'cookie-parser';

import routes from './src/routes.js';
import { authMiddleware } from './src/middlewares/authMiddleware.js';

const app = express();
const PORT = 5000;

app.engine('hbs', hbs.express4({
    defaultLayout: './src/views/layouts/main.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware);

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});