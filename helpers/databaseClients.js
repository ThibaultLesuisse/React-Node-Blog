const redis = require('redis');
const mongoose = require('mongoose');

exports.redis = redis.createClient({port: 6379});;
exports.mongoose = mongoose.connect('mongodb://localhost/test');