const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({

    service: 'hotmail',
    auth: {
        user: 'adoptedyourpet@outlook.es',
        pass: 'Popino2020'
    }
})

module.exports = transporter