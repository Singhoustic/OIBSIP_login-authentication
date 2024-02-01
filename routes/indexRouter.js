var express = require('express');
var router = express.Router();
const userModel = require("../model/user");


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
  const currentLoggedInUser = req.user;
  console.log("req.user: ", currentLoggedInUser)
  res.render('dashboard', { User: 'There!' });
})

module.exports = router;
