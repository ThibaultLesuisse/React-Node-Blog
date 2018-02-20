let sessions = require('../session');

module.exports = (req, res) => {
    if(sessions.indexOf(req.cookies.session) != -1){
        return true;
    }else{
        return false;
    }
}