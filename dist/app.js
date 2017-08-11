'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _apiRoutes = require('./apiRoutes');

var _apiRoutes2 = _interopRequireDefault(_apiRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configure Database here

_mongoose2.default.Promise = global.Promise;

_mongoose2.default.connect('mongodb://localhost/awesomeblog', {
  useMongoClient: true
}).then(function () {
  console.log('Connected to mongodb via mongoose');
}, function (err) {
  console.log('Error connecting to database');
  console.log(err);
});

// Express App

var app = (0, _express2.default)();

// Middleware

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _morgan2.default)('dev'));

app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', _path2.default.join(__dirname, '../views'));

// Routes
app.use('/api', _apiRoutes2.default);
app.use('/', _routes2.default);

// app.use( express.static( path.join(__dirname,'client/build') ) );
// app.get('*', (req, res) => {
//   res.sendFile( path.join(__dirname,'client/build/index.html') );
// });

// Server

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port 3000');
});
//# sourceMappingURL=app.js.map