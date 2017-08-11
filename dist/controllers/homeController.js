'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var homeController = {};

homeController.welcome = function (req, res) {
  res.render('pages/home');
};

homeController.about = function (req, res) {
  var data = { name: "Abbas" };
  res.render('pages/about', data);
};

homeController.contact = function (req, res) {
  res.json({
    message: "Contact at aimen@gmail.com"
  });
};

exports.default = homeController;
//# sourceMappingURL=homeController.js.map