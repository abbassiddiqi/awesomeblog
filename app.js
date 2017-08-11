import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import session from 'express-session';

import routes from './routes';
import apiRoutes from './apiRoutes';

// Configure Database here

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/aimenblog',{
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

// Middleware

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true}) );
app.use( morgan('dev') );

app.use( express.static( path.join(__dirname,'public') ) );

app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'));

// Routes
app.use('/api', apiRoutes);
app.use('/', routes);


// app.use( express.static( path.join(__dirname,'client/build') ) );
// app.get('*', (req, res) => {
//   res.sendFile( path.join(__dirname,'client/build/index.html') );
// });

// Server
app.listen(3000, () => {
  console.log('listening on port 3000');
});