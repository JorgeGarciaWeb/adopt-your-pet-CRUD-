const router = require("express").Router()
const Pet = require('../models/Pet.models')
const Pound = require('../models/Pound.models')
const { isLoggedIn, isOwner, isAdmin } = require("../middleware/session-guard")
const { rolesChecker } = require('../utils/roles-checker')
const { formatDay } = require('../utils/format-day')
const { checkRole } = require('../middleware/roles-checker')
const uploaderConfig = require('./../config/uploader.config')



//LIST
router.get('/lista', (req, res, next) => {

    Pet
        .find()
        .then(dogs => res.render("pets/list", { dogs }))
        .catch(error => next(new Error(error)))
})

//PET LISTING
router.get('/iniciar-sesion', (req, res, next) => {

    const { _id: owner } = req.session.currentUser

    Pet
        .find({ owner })
        .then(pets => res.render('user/profile', { pets }))
        .catch(error => next(new Error(error)))
})

//CREATE
router.get('/crear', isLoggedIn, isOwner, (req, res, next) => {

    Pound
        .find()
        .then((pounds) => res.render("pets/create", { pounds }))
        .catch(error => next(new Error(error)))
});


router.post('/crear', isLoggedIn, isOwner, uploaderConfig.single('avatar'), (req, res, next) => {

    const { name, birth, description, cast } = req.body

    const owner = req.session.currentUser._id

    Pet
        .create({ name, birth, description, cast, owner, avatar: req.file.path })
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
        .then(pets => res.render('pets/details', { pets, roles }))
        .catch(error => next(new Error(error)))
})

//EDIT
router.get('/editar/:id', isLoggedIn, isOwner, (req, res, next) => {

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


router.post('/editar/:id', isOwner, uploaderConfig.single('avatar'), (req, res, next) => {

    const { id } = req.params
    const { name, birth, description, cast } = req.body

    let query = { name, birth, description, cast }

    if (req.file) {
        query = { ...query, avatar: req.file.path }
    }

    Pet
        .findByIdAndUpdate(id, query)
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
