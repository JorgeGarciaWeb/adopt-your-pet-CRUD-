const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({

    service: 'hotmail',
    auth: {
        user: 'webmad0522@outlook.es',
        pass: 'Popino22'
    }
})

module.exports = transporter