import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import session from 'express-session';
import paginate from 'express-paginate';
import parseurl from 'parseurl';
import methodOverride from 'method-override';
import moment from 'moment';

import routes from './routes';
import apiRoutes from './apiRoutes';

import sessionManagementMW from './middlewares/sessionManagementMW';
import pageVisitsMW from './middlewares/pageVisitsMW';

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

app.use( methodOverride('_method') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true}) );
app.use( morgan('dev') );
app.use( paginate.middleware(3,50) );
app.use( session({
    secret: 'Lo Dasso',
    resave: false,
    saveUninitialized: true
  })
);
app.use( express.static( path.join(__dirname,'../public') ) );

// Setting local variables

app.locals.moment = moment;
app.locals.shortDateFormat = "ddd @ h:mmA";

// Middleware to define flashMessage null
app.use( (req, res, next) => {
  res.locals.flashMessage = null;
  next();
});

// Middleware to store page visit counts in session variable
app.use( pageVisitsMW );

// Middleware to pass session variables to the response
app.use( sessionManagementMW );


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
