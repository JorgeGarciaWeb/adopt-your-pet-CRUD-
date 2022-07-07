const router = require("express").Router()
const Pet = require('../models/Pet.models')
const User = require('../models/User.model')

router.get('/mis-perros', (req, res, next) => {
    const { _id: owner } = req.session.currentUser

    Pet
        .find({ owner })
        .then(pets => res.render('user/profile', { pets }))
        .catch(error => next(new Error(error)))
})


module.exports = router