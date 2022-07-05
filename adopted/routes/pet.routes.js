const router = require("express").Router()
const Pet = require('../models/Pet.models')
const Pound = require('../models/Pound.models')
const { isLoggedIn, isOwner, isAdmin } = require("../error-handling/middleware/session-guard")
const { rolesChecker } = require('../utils/roles-checker')
const { checkRole } = require('../error-handling/middleware/roles-checker')



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

router.get('/crear', isLoggedIn, isOwner, (req, res) => {
    Pound
        .find()
        .then((pounds) => {
            res.render("pets/create", { pounds });
        });
})

router.post('/crear', isLoggedIn, isOwner, (req, res, next) => {
    const { name, birth, description, avatar, cast } = req.body

    const owner = req.session.currentUser._id

    Pet
        .create({ name, birth, description, avatar, cast, owner })
        .then(() => {
            res.redirect('lista')
        })
        .catch(error => next(new Error(error)))
})

//DETAILS

router.get('/:id', (req, res, next) => {

    const { id } = req.params
    const roles = rolesChecker(req.session.currentUser)

    Pet
        .findById(id)
        .populate('cast')
        .populate('owner')
        .then(pets => res.render('pets/details', { pets, roles }))
        .catch(error => next(new Error(error)))
}),

    //EDIT
    router.get('/editar/:id', (req, res, next) => {

        const { id } = req.params
        Pet
            .findById(id)
            .then(pet => {
                Pound
                    .find()
                    .then(pounds => {
                        res.render('pets/edit', { pet, pounds })
                    })

            })
            .catch(error => next(new Error(error)))
    })

router.post('/editar/:id', (req, res, next) => {

    const { id } = req.params
    const { name, birth, description, avatar, cast } = req.body
    console.log(req.body)

    Pet
        .findByIdAndUpdate(id, { name, birth, description, avatar, cast })
        .then(() => {
            res.redirect('/perros/lista')
        })
        .catch(error => next(new Error(error)))

})

//DELETE

router.post("/borrar/:id", (req, res, next) => {
    const { id } = req.params;

    Pet.findByIdAndDelete(id)
        .then(() => {
            res.redirect("/perros/lista");
        })
        .catch(error => next(new Error(error)))
});

//USER DOGS
router.get('/mis-perros', (req, res, next) => {

    res.send('Vaaa')

})

module.exports = router
