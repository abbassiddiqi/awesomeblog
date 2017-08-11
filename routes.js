import express from 'express';

const routes = express.Router();

import homeController from './controllers/homeController';
import usersController from './controllers/usersController';
import postsController from './controllers/postsController';
import commentsController from './controllers/commentsController';

// Home Controller
routes.get('/', homeController.welcome);
routes.get('/about', homeController.about);
routes.get('/contact', homeController.contact);

// User Routes
routes.get('/signup', usersController.signup);
routes.post('/register', usersController.register);
routes.get('/login', usersController.login);
routes.post('/login', usersController.authenticate);
routes.get('/logout', usersController.logout);

// Post Routes
routes.post('/posts', postsController.store);
routes.get('/posts', postsController.getAll);
routes.get('/posts/create', postsController.create);
routes.post('/posts/:postId/comment',commentsController.store);
routes.get('/posts/:postId', postsController.show);


export default routes;
