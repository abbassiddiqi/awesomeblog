import express from 'express';

const routes = express();

import homeController from './controllers/homeController';
import usersController from './controllers/usersController';
import postsController from './controllers/postsController';

// Home Controller
routes.get('/', homeController.welcome);
routes.get('/about', homeController.about);
routes.get('/contact', homeController.contact);

// User Routes
routes.post('/signup', usersController.signup);
//routes.post('/login', usersController.login);

// Post Routes
routes.post('/posts', postsController.store);
routes.get('/posts', postsController.getAll);

export default routes;
