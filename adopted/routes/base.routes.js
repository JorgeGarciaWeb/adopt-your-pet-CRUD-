const router = require("express").Router()

const Pet = require('../models/Pet.models')
const transporter = require('../config/transporter.config')

router.get("/", (req, res) => res.render("index"))

//CONTACT ADOPT DOG
router.get('/contacto/:id', (req, res, next) => {

    const { id } = req.params

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
            from: "<adoptatuperro2022@gmail.com>",
            to: ownerEmail,
            subject: subject,
            text: message,
            html: ` 
           <div> 
           <p>Hola humano!</p> 
           <p>Tu solicitud está en tramite</p> 
           <p>Pronto tendras noticias del albergue! </p> 
           <hr>
           <p>Albergues de España </p>
           </div> 
       `
        })
        .then(() => res.redirect('perros/lista'))
        .catch(error => next(new Error(error)))

})

module.exports = router

