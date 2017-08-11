const homeController = {};

homeController.welcome = (req, res) => {
  res.render('pages/home');
}

homeController.about = (req, res) => {
  const data = { name: "Abbas" };
  res.render('pages/about', data);
}

homeController.contact = (req, res) => {
  res.json({
    message: "Contact at aimen@gmail.com"
  });
}

export default homeController;
