const router = require("express").Router();

const Pound = require("../models/Pound.models")
const { isLoggedIn, isLoggedOut, isAdmin } = require("../error-handling/middleware/session-guard")

//POUND LIST 
router.get('/lista', (req, res, next) => {

    Pound
        .find()
        .then(pound => {
            res.render('pound/list', { pound })
        })
        .catch(error => next(new Error(error)))
})

//POUND CREATE
router.get('/crear', isLoggedIn, isAdmin, (req, res, next) => res.render('pound/create'))

router.post('/crear', (req, res, next) => {

    const { name, description, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Pound
        .create({ name, description, location })
        .then(() => res.redirect('/albergue/lista'))
        .catch(error => next(new Error(error)))
})








module.exports = router;