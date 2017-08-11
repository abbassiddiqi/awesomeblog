'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersController = {};

usersController.signup = function (req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;


  var user = new _models2.default.User({
    username: username,
    password: password
  });

  user.save().then(function (newUser) {
    res.status(200).json({
      success: true,
      data: newUser
    });
  }).catch(function (err) {
    res.status(500).json({
      errMessage: err.toString()
    });
  });
};

exports.default = usersController;
//# sourceMappingURL=usersController.js.map