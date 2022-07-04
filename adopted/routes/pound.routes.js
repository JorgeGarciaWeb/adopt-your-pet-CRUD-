const router = require("express").Router();

const Pound = require("../models/Pound.models")

//GET 
router.get('/lista', (req, res, next) => {
    res.send("no arriesgo!")
})


module.exports = router;