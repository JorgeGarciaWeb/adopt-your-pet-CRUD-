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
            res.render('page/contact', editPound)
        })
        .catch(error => next(new Error(error)))

})
router.post('/contacto/:id', (req, res, next) => {

    const { subject, message, email, ownerEmail } = req.body
    const { id } = req.params

    transporter
        .sendMail({
            from: "<adoptatuperro2022@gmail.com>",
            to: ownerEmail,
            subject: subject,
            text: message,
            html: ` 
           <div> 
           <p>Hola!!</p> 
           <p>Se ha solicitado la adopción de un perrete de tu albergue</p> 
           <p>Dirigite a tu perfil para aceptar la adopción </p> 
           <hr>
           <p>Mensaje: ${message}</p> 
           <p>email del interesad@: ${email}</p> 

           <p>Adopt a dog_ </p>
           </div> 
       `
        })
        .then(() => {
            res.redirect('/perros/lista')
        })
        .catch(error => next(new Error(error)))

})

module.exports = router

