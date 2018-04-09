const sessionMiddelware = require('./../session');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');


mongoose.connect('mongodb://localhost/test');


let password = "thib4life";
let session = sessionMiddelware.sessions();

exports.login = (req, res) => {
    res.render('user/login');
}
exports.loginSubmit = (req, res) => {
    console.log('in login function');
    if (req.body.email) {
        User.findOne({
            'email': req.body.email
        }, 'email password name', (err, user) => {
            if (err) {
                console.log('invalid error');
                res.render('home', {
                    error: 'invalid_username'
                });
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) {
                    console.log('invalid error');
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
                    console.log('invalid password')
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
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                let new_user = new User({
                    email: req.body.email,
                    password: hash,
                    name: req.body.name
                });
                new_user.save().then(() => console.log('user ' + req.body.name + ' saved'));
                res.render('blog');
            });
        });
    }
}

function insertIntoSession(id) {
    let length = 32;
    const maxByte = 256;
    let string = '';
    while (length > 0) {
        var buf = crypto.randomBytes(Math.ceil(length * 256 / maxByte));
        for (var i = 0; i < buf.length && length > 0; i++) {
            var randomByte = buf.readUInt8(i);
            if (randomByte < maxByte) {
                string += String.fromCharCode(randomByte);
                length--;
            }
        }
    }
    session.push(string);
    require('../session').setSession(id, string);
    return string;
}