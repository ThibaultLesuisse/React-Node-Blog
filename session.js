const redis = require("redis");
client = redis.createClient();

let sessions = [];
exports.sessions = () => {
    return sessions;
};
exports.middleware = (req, res, next) => {
    if (req.cookies.session) {
        client.get(req.cookies.session, (err, reply) => {
            if (err) {
                res.render('user/login');
            } else {
                next();
            }
        })
    } else {
        res.render('user/login');
    }
}

exports.setSession = (key, value) => {
    client.set(key, value, redis.print);
    client.expire(key, 3600);
}