const router = require("express").Router()
const Pet = require('../models/Pet.models')
const Pound = require('../models/Pound.models')
const { isLoggedIn, isOwner, isAdmin } = require("../error-handling/middleware/session-guard")



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
    console.log(req.body)
    Pet
        .create({ name, birth, description, avatar, cast })
        .then(() => {
            res.redirect('lista')
        })
        .catch(error => next(new Error(error)))
})

//DETAILS

router.get('/:id', (req, res) => {
    const { id } = req.params

    Pet
        .findById(id)
        .populate('cast')
        .then(pets => {

            res.render('pets/details', pets)
        })
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






module.exports = router
