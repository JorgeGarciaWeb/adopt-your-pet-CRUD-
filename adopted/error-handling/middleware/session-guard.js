const isLoggedIn = (req, res, next) => {

    !req.session.currentUser ? res.render('auth/login', { errorMessage: 'Desautotizado' }) : next()
    // if (!req.session.currentUser) {
    //     return res.render('auth/login', { errorMessage: 'Desautotizado' })
    // }
    // next()
}

const isLoggedOut = (req, res, next) => {

    req.session.currentUser ? res.redirect('/') : next()
    // if (req.session.currentUser) {
    //     return res.redirect('/')
    // }
    // next()
}

const isAdmin = (req, res, next) => {

    const admin = req.session.currentUser.role === 'ADMIN'

    if (admin) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'No tienes permisos para registrar albergues' })
    }
}

const isOwner = (req, res, next) => {

    const owner = req.session.currentUser.role === 'OWNER'

    if (owner) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'No tienes permisos para registrar perros' })
    }
}
module.exports = { isLoggedIn, isLoggedOut, isAdmin, isOwner }