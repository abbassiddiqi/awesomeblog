import db from '../models';
const usersController = {};

usersController.signup = (req, res) => {
  res.render('auth/signup');
}

usersController.register = (req, res) => {

  let {
    username,
    password
  } = req.body;

  const user = new db.User({
    username,
    password
  });

  user.save()
    .then( (newUser) => {
      req.session.user = newUser;
      delete req.session.user.password;
      res.render('auth/registered',{user: newUser});
    })
    .catch( (err) => {
      req.session.flashMessage = {
        type: 'error',
        message: err.message
      };
      res.redirect('back');
    });
}

export default usersController;
