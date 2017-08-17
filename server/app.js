import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import session from 'express-session';
import parseurl from 'parseurl';

import routes from './routes';
import apiRoutes from './apiRoutes';

// Configure Database here

mongoose.Promise = global.Promise;
const mongodbUri = process.env.MONGODB_URI;
mongoose.connect(mongodbUri,{
  useMongoClient: true
}).then(
  () => {
    console.log('Connected to mongodb via mongoose');
  },
  (err) => {
    console.log('Error connecting to database');
    console.log(err);
  }
);

// Express App

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, '../views'));

// Middleware

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true}) );
app.use( morgan('dev') );
app.use( session({
    secret: 'Lo Dasso',
    resave: false,
    saveUninitialized: true
  })
);
app.use( express.static( path.join(__dirname,'../public') ) );

// Middleware to store page visit counts in session variable
app.use( (req, res, next) => {

  if( !req.session )
    throw Error('No session initialized');

  // set views variable
  if( !req.session.views ) {
    req.session.views = {};
  }

  const pathname = parseurl(req).pathname;
  req.session.views[pathname] = ( req.session.views[pathname] || 0 ) + 1;

  next();
});

// Middleware to pass session variables to the response
app.use( (req, res, next) => {
  if( req.session ) {

    if( req.session.flashMessage ) {
      res.locals.flashMessage = req.session.flashMessage;
      delete req.session.flashMessage;
    }

    if( req.session.user ) {
      res.locals.user = req.session.user;
    } else {
      res.locals.user = null;
    }

    if( req.session.views ) {
      res.locals.pvCount = req.session.views[parseurl(req).pathname];
    }
  }
  next();
});

// Routes
app.use('/api', apiRoutes);
app.use('/', routes);


// app.use( express.static( path.join(__dirname,'client/build') ) );
// app.get('*', (req, res) => {
//   res.sendFile( path.join(__dirname,'client/build/index.html') );
// });



// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('listening on port: ' + port);
  console.log("Environment: " + app.get('env') );
});
