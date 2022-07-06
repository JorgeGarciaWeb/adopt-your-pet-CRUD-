const router = require("express").Router()
const Pet = require('../models/Pet.models')
const Pound = require("../models/Pound.models")
const User = require("../models/User.model")
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middleware/session-guard")
const { rolesChecker } = require('../utils/roles-checker')

//POUND LIST 
router.get('/lista', (req, res, next) => {

    Pound
        .find()
        .then(pound => res.render('pound/list', { pound }))
        .catch(error => next(new Error(error)))
})

//POUND ADOPTED
router.get('/formulario-adopcion/:id', (req, res, next) => {

    const { id: thisId } = req.params

    User
        .find()
        .then(allUsers => res.render('pound/adoption', { allUsers, thisId }))
        .catch(error => next(new Error(error)))
})
router.post('/formulario-adopcion/:id', (req, res, next) => {

    const { name, owner } = req.body

    console.log('soy el owner maybe?', owner)

    const { id } = req.params

    User
        .findById(owner)
        .then(user => Pet.findByIdAndUpdate(id, { owner: user._id }))
        .then(() => res.redirect('/'))
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
router.get('/:id', (req, res, next) => {

    const { id } = req.params
    const roles = rolesChecker(req.session.currentUser)

    Pound
        .findById(id)
        .then(pound => res.render('pound/details', { pound, roles }))
        .catch(error => next(new Error(error)))
})



//EDIT POUND
router.get('/:id/editar', (req, res, next) => {

    const { _id } = req.params

    Pound
        .findById(_id)
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


// ADOPTING DOG
router.get('/formulario-adopcion', (req, res, next) => {

    res.send('Vaa')

    User
        .find()
        .then(allUsers => res.render('pound/adoption', allUsers))
        .catch(error => next(new Error(error)))

})




module.exports = router