const router = require("express").Router()

const Pet = require('../models/Pet.models')
const transporter = require('../config/transporter.config')

router.get("/", (req, res) => res.render("index"))

//CONTACT ADOPT DOG
router.get('/contacto/:id', (req, res) => {

    const { id } = req.params
    console.log(id)
    Pet
        .findById(id)
        .populate('owner')
        .then(editPound => res.render('user/profile', editPound))
        .catch(error => next(new Error(error)))

})
router.post('/contacto/:id', (req, res, next) => {


    const { subject, message, email, name } = req.body
    const { id } = req.params

    transporter
        .sendMail({

            from: "adoptedyourpet@outlook.es",
            to: email,
            subject: subject,
            text: message,

        })
        .then(details => res.redirect('perros/lista'))
        .catch(error => next(new Error(error)))

})

module.exports = router

