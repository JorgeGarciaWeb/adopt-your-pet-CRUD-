const router = require("express").Router()
const Pet = require('../models/Pet.models')
const User = require("../models/User.model")
const { checkRole } = require('../middleware/roles-checker')
const { rolesChecker } = require('../utils/roles-checker')
const { isLoggedIn, isOwner, isAdmin } = require("../middleware/session-guard")
const transporter = require('../config/transporter.config')
const { captureRejectionSymbol } = require("connect-mongo")


//CHANGE ROLE
router.get('/mi-perfil', isLoggedIn, (req, res, next) => {

    const { _id: owner } = req.session.currentUser
    const roles = rolesChecker(req.session.currentUser)

    const promises = [
        Pet.find({ owner }),
        User.findById(owner),
        User.find()
    ]

    Promise
        .all(promises)
        .then(([pet, user, users]) => {

            const newUsers = users.filter(user => user.role === 'USER')
            const newUsersObj = { ...newUsers }
            res.render('user/my-dogs', { pet, user, roles, newUsersObj })
        })
        .catch(error => next(new Error(error)))
})

//CHANGE ROLE
router.post('/edit-role-OWNER', (req, res) => {

    const { newOwner } = req.body

    User
        .findByIdAndUpdate(newOwner, { role: 'OWNER' })
        .then(() => res.redirect('/mi-perfil'))
        .catch(err => console.log(err))

})

router.get("/", (req, res) => res.render("index"))

//REGISTER USER WITH OWNER
router.get('/cambiar-rol/:id', (req, res, next) => {

    const { id } = req.params

    res.render('page/owner', { id })

})
router.post('/cambiar-rol/:id', (req, res, next) => {

    const { subject, message, email, ownerEmail, name } = req.body
    const { id } = req.params

    transporter
        .sendMail({
            from: "<adoptatuperro2022@gmail.com>",
            to: "<jorge.garcia.camp@outlook.com>",
            subject: subject,
            text: message,
            html: ` 
           <div> 
           <p>Email del solicitante: ${email}</p> 
           <p>${message}</p> 
           <hr>
           <p>Buenos días</p> 
           <p>Se ha solicitado un registro de albergue nuevo.</p> 
           <p>En un plazo máximo de 24 horas tiene que ser autorizado.</p> 
           <hr>
           <p>Salva una vida</p>
           <img src="https://refugiolareserva.protecms.com/logos/logo@0.5x.png">
           
           </div> 
       `
        })
        .then(() => res.redirect('/mi-perfil'))
        .catch(error => next(new Error(error)))

})

module.exports = router
