const homeController = {};

homeController.welcome = (req, res) => {
  res.json({
    message: 'Welcome to our API!'
  })
}

homeController.about = (req, res) => {
  res.json({
    message: "This is Aimen's blog"
  });
}

homeController.contact = (req, res) => {
  res.json({
    message: "Contact at aimen@gmail.com"
  });
}

export default homeController;
