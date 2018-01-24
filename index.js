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
const app = express();
const sessionMiddelware = require('./session');
//Controllers

const homeController = require('./controllers/homeController');
const loginController = require('./controllers/loginController');
const blogController = require('./controllers/blogController');
clientRedis = redis.createClient({port: 6379});

//Middlewere

app.use(morgan('dev'));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(session({
    store: new RedisStore({client: clientRedis}),
    secret: 'keyboard cat'
}));
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
//Routes Without Authentication
app.get('/', homeController.Home);
app.get('/register', homeController.Register);
app.post('/register',urlencodedParser, loginController.Register);
app.get('/loginerror', (req, res) => {
    res.render('loginerror');
    res.end();
});
app.post('/login' , urlencodedParser, loginController.Login );

// ----- AUTH --------
//Routes with Authentication


app.get('/profile',sessionMiddelware.middleware, blogController.blog);

app.use(errorHandler());

app.listen(3000, () => {console.log("server running on port 3000")});
module.exports = app;