const router = require("express").Router()

const Pound = require('./../models/Pound.models')

router.get('/pound', (req, res) => {

    Pound
        .find()
        .then(maps => res.json(maps))
        .catch(err => res.status(500).json({ message: 'error de servidor', err }))
})

module.exports = router