'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _homeController = require('./controllers/homeController');

var _homeController2 = _interopRequireDefault(_homeController);

var _usersController = require('./controllers/usersController');

var _usersController2 = _interopRequireDefault(_usersController);

var _postsController = require('./controllers/postsController');

var _postsController2 = _interopRequireDefault(_postsController);

var _commentsController = require('./controllers/commentsController');

var _commentsController2 = _interopRequireDefault(_commentsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = _express2.default.Router();

// Home Controller
routes.get('/', _homeController2.default.welcome);
routes.get('/about', _homeController2.default.about);
routes.get('/contact', _homeController2.default.contact);

// User Routes
routes.get('/signup', _usersController2.default.signup);
routes.post('/register', _usersController2.default.register);
routes.get('/login', _usersController2.default.login);
routes.post('/login', _usersController2.default.authenticate);
routes.get('/logout', _usersController2.default.logout);

// Post Routes
routes.post('/posts', _postsController2.default.store);
routes.get('/posts', _postsController2.default.getAll);
routes.get('/posts/create', _postsController2.default.create);
routes.post('/posts/:postId/comment', _commentsController2.default.store);
routes.get('/posts/:postId', _postsController2.default.show);

exports.default = routes;
//# sourceMappingURL=routes.js.map