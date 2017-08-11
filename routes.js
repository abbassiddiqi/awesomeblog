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
routes.get('/signup', usersController.signup);
routes.post('/register', usersController.register);
routes.get('/login', usersController.login);
routes.post('/login', usersController.authenticate);

// Post Routes
routes.post('/posts', postsController.store);
routes.get('/posts', postsController.getAll);
routes.get('/posts/create', postsController.create);
routes.get('/posts/:postId', postsController.show);

export default routes;
