const express = require('express');
const Router = express.Router();
const homeController = require('./controllers/homeController');
const loginController = require('./controllers/loginController');
const blogController = require('./controllers/blogController');
const webpack = require('webpack');
const path = require('path');
const authSession = require('./session').middleware

Router.get('/', homeController.Home);
Router.get('/register', homeController.Register);
Router.post('/register', loginController.Register);
Router.get('/loginerror', (req, res) => {
    res.render('loginerror');
    res.end();
});
Router.get('/login', loginController.login)
Router.post('/login', loginController.loginSubmit );
Router.get('/blog', authSession, blogController.blog );
Router.get('/blog/new', blogController.new);
Router.post('/blog/new', blogController.newSubmit)
// ----- AUTH --------
//Routes with Authentication


Router.get('/profile', blogController.blog);








module.exports = Router