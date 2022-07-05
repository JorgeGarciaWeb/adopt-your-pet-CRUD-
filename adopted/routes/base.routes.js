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
<<<<<<< HEAD
=======

>>>>>>> 9b52ebd4e8dea486c4da99b73b2685e427b38dbe
            from: "adoptedyourpet@outlook.es",
            to: email,
            subject: subject,
            text: message,

        })
<<<<<<< HEAD
        .then(details => res.redirect('/'))
=======
        .then(details => res.redirect('perros/lista'))
>>>>>>> 9b52ebd4e8dea486c4da99b73b2685e427b38dbe
        .catch(error => next(new Error(error)))

})

module.exports = router

