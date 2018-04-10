const express = require('express');
const body = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session);
const errorHandler = require('errorhandler');
const routes = require('./routes/routes');
const app = express();
const sessionMiddelware = require('./session');
const webpack = require('webpack');
const webpackConfig = require('./webpack/webpack.dev');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compiler = webpack(webpackConfig);
const middleware = createWebpackMiddleware(compiler, webpackConfig.output.publicPath);


// Common Middlewere
app.use(morgan('dev'));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// Routes
app.use(routes);

// ErrorHandler
app.use(errorHandler());

// Webpackmiddleware
app.use(middleware);
app.use(webpackHotMiddleware(compiler));
const fs = middleware.fileSystem;
app.get('/react',(req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
        if (err) {
            res.sendStatus(404);
          } else {
            res.send(file.toString());
          }
    })
});
app.listen(3000, () => {console.log("server running on port 3000")});
module.exports = app;

function createWebpackMiddleware(compiler, publicPath) {
    return webpackDevMiddleware(compiler, {
      noInfo: false,
      publicPath,
      silent: true,
      stats: 'errors-only',
    });
  }