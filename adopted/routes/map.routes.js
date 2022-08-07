const router = require("express").Router()

router.get("/list", (req, res, next) => res.render("pound/list"))

module.exports = router