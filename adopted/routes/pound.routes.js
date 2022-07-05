const router = require("express").Router();

const Pound = require("../models/Pound.models")
const { isLoggedIn, isLoggedOut, isAdmin } = require("../error-handling/middleware/session-guard")

//POUND LIST 
router.get('/lista', (req, res, next) => {

    Pound
        .find()
        .then(pound => res.render('pound/list', { pound }))
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

//DETAILS POUND
router.get('/:id', (req, res) => {

    const { id } = req.params

    Pound
        .findById(id)
        .then(pound => res.render('pound/details', pound))
        .catch(error => next(new Error(error)))
})



//EDIT POUND
router.get('/:id/editar', (req, res, next) => {

    const { id } = req.params

    Pound
        .findById(id)
        .then(editPound => res.render('pound/edit', editPound))
        .catch(error => next(new Error(error)))

})

router.post('/:id/editar', (req, res, next) => {

    const { name, description, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    const { id } = req.params

    Pound
        .findByIdAndUpdate(id, { name, description, location })
        .then(() => res.redirect('/albergue/lista'))
        .catch(error => next(new Error(error)))

})

//DELETE POUND
router.post('/:id/eliminar', (req, res, next) => {

    const { id } = req.params

    Pound
        .findByIdAndDelete(id)
        .then(() => res.redirect('/albergue/lista'))
        .catch(error => next(new Error(error)))
})

module.exports = router;