const router = require("express").Router()
const Pet = require('../models/Pet.models')



router.get('/mis-perros/:id', (req, res, next) => {

    // req.session.currentUser = user

    const { _id: owner } = req.session.currentUser

    Pet
        .find({ owner })
        .then(pets => {res.render('user/profile', { pets })})
        .catch(error => next(new Error(error)))
})

module.exports = router