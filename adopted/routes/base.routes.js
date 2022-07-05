const router = require("express").Router();
const transporter = require('../config/transporter.config')

router.get("/", (req, res) => res.render("index"))



router.get('/contacto', (req, res) => res.render('page/contact'))

router.post('/contacto', (req, res, next) => {

    const { subject, message, email, name } = req.body

    // console.log(req.body)

    transporter
        .sendMail({
            from: `"Email de ${name}" adoptedyourpet@outlook.es`,
            to: email,
            subject: subject,
            text: message,
            html: `<b>${message}</b>`
        })
        .then(details => res.send(details))
        .catch(error => next(new Error(error)))

})

module.exports = router
