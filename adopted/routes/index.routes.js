const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//AUTH ROUTES
router.use("/", require("./auth.routes"))

// USER ROUTES
// router.use("/", require("./user.routes"))

//DOGS ROUTES
router.use("/perros", require("./pet.routes"))

module.exports = router;



