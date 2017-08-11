"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var homeController = {};

homeController.welcome = function (req, res) {
  res.json({
    message: 'Welcome to our API!'
  });
};

homeController.about = function (req, res) {
  res.json({
    message: "This is Aimen's blog"
  });
};

homeController.contact = function (req, res) {
  res.json({
    message: "Contact at aimen@gmail.com"
  });
};

exports.default = homeController;
//# sourceMappingURL=homeController.js.map