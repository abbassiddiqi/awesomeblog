const homeController = {};

import parseurl from 'parseurl';

homeController.welcome = (req, res) => {
  res.render('pages/home');
}

homeController.about = (req, res) => {
  res.render('pages/about');
}

homeController.contact = (req, res) => {
  res.json({
    message: "Contact at aimen@gmail.com"
  });
}

export default homeController;
