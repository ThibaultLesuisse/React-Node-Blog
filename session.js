

let sessions = [];
exports.sessions =  () => {
    return sessions;
};
exports.middleware = (req, res, next)=> {
   
    if(sessions.indexOf(req.cookies.session) != -1){
        console.log('Got in the cookie looker');
        next();
    }
    else{
        res.render('loginerror');
    }
}