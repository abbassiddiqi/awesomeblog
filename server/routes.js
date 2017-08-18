import express from 'express';


function isAuthenticated(req, res, next) {
  if( req.session && req.session.user ) {
    return next();
  }
  req.session.flashMessage = "Please login to the website.";
  res.redirect('/login');
}


const routes = express.Router();

import homeController from './controllers/homeController';
import usersController from './controllers/usersController';
import authController from './controllers/authController';
import postsController from './controllers/postsController';
import commentsController from './controllers/commentsController';

// Home Controller
routes.get('/', isAuthenticated, homeController.welcome);
routes.get('/about', homeController.about);
routes.get('/contact', homeController.contact);

// User Routes
routes.get('/signup', usersController.signup);
routes.post('/register', usersController.register);

// Authentication Routes
routes.get('/login', authController.login);
routes.post('/login', authController.authenticate);
routes.get('/logout', isAuthenticated, authController.logout);

// Post Routes
routes.post('/posts', isAuthenticated, postsController.store);
routes.get('/posts', isAuthenticated, postsController.getAll);
routes.get('/posts/create', isAuthenticated, postsController.create);
routes.post('/posts/:postId/comment', isAuthenticated, commentsController.store);
routes.get('/posts/:postId', isAuthenticated, postsController.show);

// Comment Routes
routes.post('/comments', isAuthenticated, commentsController.store);
routes.get('/comments/:commentId', isAuthenticated, commentsController.destroy);

export default routes;
