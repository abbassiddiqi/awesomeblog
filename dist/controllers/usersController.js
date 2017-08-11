'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersController = {};

usersController.signup = function (req, res) {
  res.render('auth/signup');
};

usersController.register = function (req, res) {

  console.log('Trying to register');

  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;


  var user = new _models2.default.User({
    username: username,
    password: password
  });

  user.save().then(function (newUser) {
    res.render('auth/registered', { user: newUser });
  }).catch(function (err) {
    res.render('auth/signup');
  });
};

usersController.login = function (req, res) {
  console.log('showing the login form');
  res.render('auth/login');
};

usersController.logout = function (req, res) {
  res.redirect('/login');
};

usersController.authenticate = function (req, res) {

  console.log('trying to authenticate');
  var _req$body2 = req.body,
      username = _req$body2.username,
      password = _req$body2.password;


  _models2.default.User.find({ username: username, password: password }).then(function (result) {
    res.status(200).json(result);
  }).catch(function (err) {
    res.status(500).json({
      errMessage: err
    });
  });
};

exports.default = usersController;
//# sourceMappingURL=usersController.js.map