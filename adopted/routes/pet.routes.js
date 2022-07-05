const router = require("express").Router()
const Pet = require('../models/Pet.models')
const Pound = require('../models/Pound.models')
const { isLoggedIn, isOwner, isAdmin } = require("../middleware/session-guard")
const { rolesChecker } = require('../utils/roles-checker')
const { checkRole } = require('../middleware/roles-checker')



//LIST
router.get('/lista', (req, res, next) => {

    Pet
        .find()
        .then(dogs => res.render("pets/list", { dogs }))
        .catch(error => next(new Error(error)))
})

//CREATE
router.get('/crear', isLoggedIn, isOwner, (req, res, next) => {

    Pound
        .find()
        .then((pounds) => res.render("pets/create", { pounds }))
        .catch(error => next(new Error(error)))
});


router.post('/crear', isLoggedIn, isOwner, (req, res, next) => {

    const { name, birth, description, avatar, cast } = req.body

    const owner = req.session.currentUser._id

    Pet
        .create({ name, birth, description, avatar, cast, owner })
        .then(() => res.redirect('lista'))
        .catch(error => next(new Error(error)))
})

//DETAILS
router.get('/:id', (req, res, next) => {

    const { id } = req.params
    const roles = rolesChecker(req.session.currentUser)

    Pet
        .findById(id)
        .populate('cast owner')
        .then(pets => res.render('pets/details', pets, roles))
        .catch(error => next(new Error(error)))
})

//EDIT
router.get('/editar/:id', isLoggedIn, isOwner, isAdmin, (req, res, next) => {

    const { id } = req.params

    const promises = [
        Pet.findById(id),
        Pound.find()
    ]

    Promise
        .all(promises)
        .then(([pet, pounds]) => res.render('pets/edit', { pet, pounds }))
        .catch(error => next(new Error(error)))
})


router.post('/editar/:id', (req, res, next) => {

    const { id } = req.params
    const { name, birth, description, avatar, cast } = req.body

    Pet
        .findByIdAndUpdate(id, { name, birth, description, avatar, cast })
        .then(() => res.redirect('/perros/lista'))
        .catch(error => next(new Error(error)))

})

//DELETE

router.post("/borrar/:id", isLoggedIn, isOwner, isAdmin, (req, res, next) => {
    const { id } = req.params;

    Pet.findByIdAndDelete(id)
        .then(() => res.redirect("/perros/lista"))
        .catch(error => next(new Error(error)))
});

module.exports = router
