const express = require('express');
const Router = express.Router();
const homeController = require('./controllers/homeController');
const loginController = require('./controllers/loginController');
const blogController = require('./controllers/blogController');
const webpack = require('webpack');
const path = require('path');

//Routes Without Authentication
Router.get('/', homeController.Home);

Router.get('/register', homeController.Register);
Router.post('/register', loginController.Register);
Router.get('/loginerror', (req, res) => {
    res.render('loginerror');
    res.end();
});
Router.post('/login', loginController.Login );
Router.get('/blog', blogController.blog)
// ----- AUTH --------
//Routes with Authentication


Router.get('/profile', blogController.blog);








module.exports = Router