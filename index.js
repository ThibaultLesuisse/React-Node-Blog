const express = require('express');
const body = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const redis = require("redis");
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session);
const errorHandler = require('errorhandler');
const routes = require('./routes');
const app = express();
const sessionMiddelware = require('./session');

// Middlewere

app.use(morgan('dev'));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// Routes
app.use(routes);

app.use(errorHandler());

app.listen(3000, () => {console.log("server running on port 3000")});
module.exports = app;