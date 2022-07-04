const router = require("express").Router()
const Pet = require('../models/Pet.models')
const Pound = require('../models/Pound.models')
const { isLoggedIn } = require("../error-handling/middleware/session-guard")

router.get('/lista', (req, res, next) => {

    Pet
        .find()
        .then(dogs => {
            res.render("pets/list", { dogs })
        })
        .catch(error => next(new Error(error)))
})

router.post('/crear', isLoggedIn, (req, res, next) => {

    const { name, description, avatar } = req.body
    const isOwner = req.session.currentUser.role === 'OWNER'

    Pet
        .create({ name, description, avatar })
        .then(() => {
            res.render('pets/create', isOwner)
        })

        .catch(error => next(new Error(error)))

})







module.exports = router
