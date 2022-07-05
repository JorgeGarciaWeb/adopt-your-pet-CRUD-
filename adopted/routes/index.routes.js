const router = require("express").Router();


//AUTH ROUTES
router.use("/", require("./auth.routes"))

//POUNDS ROUTES
router.use("/albergue", require("./pound.routes"))

//DOGS ROUTES
router.use("/perros", require("./pet.routes"))

//API ROUTES
router.use("/api", require("./api.routes"))

//BASE ROUTES
router.use('/', require('./base.routes.js'))

module.exports = router;