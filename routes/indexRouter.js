var express = require('express');
var router = express.Router();
const User = require("../model/user");


/* GET home page. */
router.get('/', function (req, res) {
  res.render('home')
})

/* GET Register page. */
router.get('/register', function (req, res) {
  res.render('register')
})

/* GET Dashboard page. */
router.get('/dashboard', async function (req, res) {
  if (req.cookies.userId) {
    const currentLoggedInUser = await User.findById(req.cookies.userId);
    res.render('dashboard', currentLoggedInUser);
  } else {
    res.redirect("/")
  }
})

module.exports = router;
