const router = require("express").Router()
const Pet = require('../models/Pet.models')
const Pound = require('../models/Pound.models')

router.get('/lista', (req, res, next) => {
    res.send('Funcionaaaaa')
})







module.exports = router
