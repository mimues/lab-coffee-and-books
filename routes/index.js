const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.redirect("/places");
});

module.exports = router;
