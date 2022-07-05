const router = require("express").Router();
const transporter = require('../config/transporter.config')

router.get("/", (req, res) => res.render("index"))



router.get('/contacto', (req, res) => res.render('page/contact'))

router.post('/contacto', (req, res, next) => {

    const { subject, message, email, name } = req.body

    // console.log(req.body)

    transporter
        .sendMail({
            from: `"Email de ${name} " <webmad0522@outlook.es>`,
            to: email,
            subject: subject,
            text: message,
            html: `<b>${message}</b>`
        })
        .then(details => res.send(details))
<<<<<<< HEAD
=======

>>>>>>> 5baf847da12f4da40654e7d527e1fc11a92f6f62
        .catch(error => next(new Error(error)))

})

module.exports = router
