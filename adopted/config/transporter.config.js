const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        user: 'adoptatuperro2022@gmail.com',
        pass: 'qjuwkafxbrpflsgc'
    }
})

module.exports = transporter