const autenticador = (req, res, next) => {
    if(typeof(req.session.usuarioLogado) != "undefined"){
        return next();
    } else {
        return res.redirect('/login');
    }
};

module.exports = autenticador;