const router = require("express").Router();

const bcryptjs = require('bcryptjs')
const User = require("../models/User.model")
const Pet = require('../models/Pet.models')
const saltRounds = 10
const { isLoggedIn, isLoggedOut } = require("../middleware/session-guard")


//SIGNUP
router.get('/registro', isLoggedOut, (req, res, next) => res.render("auth/signup"))

router.post('/registro', isLoggedOut, (req, res, next) => {

    const { username, email, avatar, password: userPassword } = req.body

    if (email.length === 0 || userPassword.length === 0) {
        res.render('auth/signup', { errorMessage: 'Los campos son obligatorios' })
        return
    }

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(userPassword, salt))
        .then(hashPassword => User.create({ ...req.body, username, email, avatar, password: hashPassword }))
        .then(() => res.redirect("/"))
        .catch(error => next(new Error(error)))

})

//LOG-IN
router.get('/iniciar-sesion', isLoggedOut, (req, res, next) => res.render('auth/login'))

router.post('/iniciar-sesion', isLoggedOut, (req, res, next) => {

    const { email, password: userPassword } = req.body

    if (email.length === 0 || userPassword.length === 0) {
        res.render('auth/login', { errorMessage: 'Los campos son obligatorios' })
        return
    }

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email incorrecto' })
                return
            }
            if (bcryptjs.compareSync(userPassword, user.password) === false) {
                res.render('auth/login', { errorMessage: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = user


            const { _id: owner } = req.session.currentUser

            Pet
                .find({ owner })
                .then(pets => res.render('user/profile', { user, pets }))
                .catch(error => next(new Error(error)))

        })
        .catch(error => next(new Error(error)))
})

//LOG-OUT
router.post('/cerrar-sesion', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router;
