import { Router } from 'express';

import homeController from './controllers/homeController.js';
import authController from './controllers/authController.js';
import blogController from './controllers/blogController.js';

const routes = Router();

routes.use(homeController);
routes.use(authController);
routes.use(blogController)

export default routes;