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
    req.session.flashMessage = {
      type: 'message',
      message: "You have logged out successfully."
    };
  }

  res.redirect('/login');
}

authController.authenticate = (req, res) => {

  const {
    username,
    password
  } = req.body;

  db.User.findOne({username, password})
    .then( (user) => {

      if( user ) {
        req.session.user = user;
        req.session.views = {};
        req.session.flashMessage = {
          type: 'success',
          message: "You have successfully logged in"
        };
        res.redirect('/');
      } else {
        req.session.flashMessage = {
          type: 'error',
          message: "Invalid Credentials"
        };
        res.redirect('back');
      }
    })
    .catch( (err) => {
      req.session.flashMessage = {
        type: 'error',
        message: err.message
      };
      res.redirect('back');
    });
};

export default authController;
