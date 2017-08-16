import db from '../models';
const usersController = {};

usersController.signup = (req, res) => {
  res.render('auth/signup');
}

usersController.register = (req, res) => {

  console.log('Trying to register');

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
      res.render('auth/registered',{user: newUser});
    })
    .catch( (err) => {
      res.render('auth/signup');
    });
}

export default usersController;
