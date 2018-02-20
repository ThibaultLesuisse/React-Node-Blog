let sessions = require('../session');

module.exports = (req, res) => {
    let _session = [];
    _session = sessions;
    console.log(sessions);
    if(_session.indexOf(req.cookies.session) != -1){
        return true;
    }else{
        return false;
    }
}