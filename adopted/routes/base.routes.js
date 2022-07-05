const router = require("express").Router();
const transporter = require('../config/transporter.config')

router.get("/", (req, res) => res.render("index"))

router.get('/contacto', (req, res) => res.render('page/contact'))

router.post('/contacto', (req, res, next) => {

    const { subject, message, email, name } = req.body

    transporter
        .sendMail({
<<<<<<< HEAD
            from: `"Email de ${name}" adoptedyourpet@outlook.es`,
            to: email,
            subject: subject,
            text: message,
            html: `<b>${message}</b>`
        })
        .then(details => res.send(details))
=======
            from: "adoptedyourpet@outlook.es",
            to: email,
            subject: subject,
            text: message,

        })
        .then(details => res.redirect('/'))
>>>>>>> 14c0d2ba95e0c61aed82f7b18566888154bccb92
        .catch(error => next(new Error(error)))

})

module.exports = router

