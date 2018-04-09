const sessionMiddelware = require('./../session');
const crypto = require('crypto');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('../helpers/databaseClients').mongoose;
const redis = require('../helpers/databaseClients').redis;
const validator = require('validator');

let session = sessionMiddelware.sessions();

exports.login = (req, res) => {
    res.render('user/login');
}
exports.loginSubmit = (req, res) => {
    console.log('in login function');
    if (req.body.email) {
        User.findOne({
            'email': req.body.email
        }, 'email password name id', (err, user) => {
            if (err) {
                res.render('home', {
                    error: 'invalid_username'
                });
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) {
                    res.render('home', {
                        error: 'invalid_password'
                    });
                }
                if (isMatch) {
                    res.cookie('session', insertIntoSession(user.id), {
                        maxAge: 900000
                    });
                    res.render('blog', {
                        user: user.name
                    });
                } else {
                    console.log('passwords dont match');
                    res.render('home', {
                        error: 'invalid_password'
                    });
                }
            });

        })
    }
}

exports.Register = (req, res) => {
    if (req.body.email && req.body.password && req.body.name) {
        console.log('before validator')
        if (validator.isEmail(req.body.email) && validator.isLength(req.body.password, {
                min: 6,
                max: 30
            }) && validator.isAlphanumeric(req.body.name) && validator.isLength(req.body.name, {
                min: 2,
                max: 30
            }) && req.body.password === req.body.password2) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    let new_user = new User({
                        email: req.body.email,
                        password: hash,
                        name: req.body.name
                    });
                    new_user.save((err, user) => {
                        insertIntoSession(user.id)
                    })
                    res.render('blog', {
                        user: new_user.name
                    });
                });
            });
        } else {
            let error = {};
            if (req.body.password !== req.body.password2) error['passwordsMatchError'] = true;
            if (!validator.isEmail(req.body.email)) error['emailFormatError'] = true;
            if (!validator.isLength(req.body.password, {
                    min: 6,
                    max: 30
                })) error['passwordLengthError'] = true;
            if (!validator.isAlphanumeric(req.body.name)) error['nameAlpha'] = true;
            if (!validator.isLength(req.body.name, {
                    min: 1,
                    max: 30
                })) error['nameLength'] = true;
            res.render('register', {
                errors: error
            });
        }
    }
}

async function insertIntoSession(id) {
    let string;
    for (let i = 0; i < 8; i++) {
        string += Math.random().toString(36).substr(2, 8);
    }
    session.push(string);
    require('../session').setSession(id, string);
    redis.get(id, (err, result) => {
        console.log('Result is ' + result);
    })
}
