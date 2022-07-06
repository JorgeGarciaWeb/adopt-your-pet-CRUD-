const router = require("express").Router()

const Pet = require('../models/Pet.models')
const transporter = require('../config/transporter.config')

router.get("/", (req, res) => res.render("index"))

//CONTACT ADOPT DOG
router.get('/contacto/:id', (req, res, next) => {

    const { id } = req.params
<<<<<<< HEAD
    
=======

    console.log('---------------', id)

>>>>>>> f5d8b1ee86452a4745037883796c77942e057394
    Pet
        .findById(id)
        .populate('owner')
        .then(editPound => {
            console.log('---------->>', editPound)
            res.render('page/contact', editPound)
        })
        .catch(error => next(new Error(error)))

})
router.post('/contacto/:id', (req, res, next) => {

    const { subject, message, email, ownerEmail } = req.body
    const { id } = req.params

    console.log('---es el correo del owner---', req.session.currentUser)

    transporter
        .sendMail({
<<<<<<< HEAD
            from: "adoptedyourpet@outlook.es",
            to: email,
=======
            from: "<adoptedyourpet@outlook.es>",
            to: ownerEmail,
>>>>>>> f5d8b1ee86452a4745037883796c77942e057394
            subject: subject,
            text: message,

        })
<<<<<<< HEAD
        .then(details => res.redirect('perros/lista'))
=======
        .then(() => res.redirect('perros/lista'))
>>>>>>> f5d8b1ee86452a4745037883796c77942e057394
        .catch(error => next(new Error(error)))

})

module.exports = router

