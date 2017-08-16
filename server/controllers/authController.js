import db from '../models';
const authController = {};

authController.login = (req, res) => {
  console.log('showing the login form');
  res.render('auth/login');
}

authController.logout = (req, res) => {
  if( req.session && req.session.user ) {
    delete req.session.user;
    delete req.session.views;
    req.session.flashMessage = "You have logged out successfully.";
  }

  res.redirect('/login');
}

authController.authenticate = (req, res) => {

  console.log('trying to authenticate');
  const {
    username,
    password
  } = req.body;

  db.User.findOne({username, password})
    .then( (user) => {

      if( user ) {
        req.session.user = user;
        req.session.flashMessage = "You have successfully logged in";
        res.redirect('/');
      } else {
        req.session.flashMessage = "Incorrect Credentials";
        res.redirect('back');
      }
    })
    .catch( (err) => {
      res.status(500).json({
        errMessage: err.toString()
      });
    });
};

export default authController;
