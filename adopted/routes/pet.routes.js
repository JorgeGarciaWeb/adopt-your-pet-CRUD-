const router = require("express").Router()
const Pet = require('../models/Pet.models')
const Pound = require('../models/Pound.models')
const { isLoggedIn, isOwner } = require("../error-handling/middleware/session-guard")

//LIST
router.get('/lista', (req, res, next) => {

    Pet
        .find()
        .then(dogs => {
            res.render("pets/list", { dogs })
        })
        .catch(error => next(new Error(error)))
})

//CREATE

router.get('/crear', isLoggedIn, isOwner, (req, res) => res.render('pets/create'))

router.post('/crear', isLoggedIn, isOwner, (req, res, next) => {
    const { name, birth, description, avatar } = req.body

    Pet
        .create({ name, birth, description, avatar })
        .then(() => {
            res.redirect('perros/lista')
        })
        .catch(error => next(new Error(error)))
})

//DETAILS

router.get('/:id', (req, res) => {
    const { id } = req.params
    //console.log("Antes del cast ->>>>>>>>>>>>>>>>", id)
    Pet
        .findById(id)
        .populate('cast')
        .populate('owner')
        .then(pets => {
            //console.log("Este es el console log", pets)
            res.render('pets/details', pets)
        })
        .catch(error => next(new Error(error)))
}),






    module.exports = router
