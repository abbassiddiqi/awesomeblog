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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _express2.default)();

// Home Controller
routes.get('/', _homeController2.default.welcome);
routes.get('/about', _homeController2.default.about);
routes.get('/contact', _homeController2.default.contact);

// User Routes
routes.post('/signup', _usersController2.default.signup);
//routes.post('/login', usersController.login);

// Post Routes
routes.post('/posts', _postsController2.default.store);
routes.get('/posts', _postsController2.default.getAll);

exports.default = routes;
//# sourceMappingURL=apiRoutes.js.map