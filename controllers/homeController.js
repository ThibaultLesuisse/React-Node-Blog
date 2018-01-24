exports.Home = (req, res) => {
    res.render('home', {
        title: 'Home'
    });
};
exports.Register = (req, res) => {
    res.render('register');
}