const express = require('express')
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const user = require('../model/user');


//Register Page Route
router.post('/register', async function (req, res) {
    try {
        const userInfo = req.body;
        let user;
        bcrypt.hash(userInfo.password, 10, async function (err, hash) {
            userInfo.password = hash;
            user = await User.create(req.body);
        });
        res.json({
            status: "success",
            message: "User ceated successfylly!",
            user: user
        });
    } catch (err) {
        console.log("Error while creating user: ", err.message)
    }
})


// Home Page Route
router.post('/home', async function (req, res) {
    try {
        //fetching home page data
        const signinUser = req.body;

        //fetching stored data from database to compare
        const data = await user.findOne({ email: req.body.username });

        //Comparing Passwords
        if (data) {
            bcrypt.compare(signinUser.loginPassword, data.password, function (err, result) {
                if (result) {
                    req.user = data;
                    res.json({
                        status: "success",
                        message: "login Successful",
                    })
                } else {
                    res.json({
                        status: "failed",
                        message: "Username or password is incorrect",
                    })
                }
            });
        } else {
            res.json({
                status: "failed",
                message: "No Username Found",
            })
        }


    }
    catch (err) {
        console.log(err);
        res.json({
            error: "Internal Server Error",
            status: 404,
            message: "Invalid Credentials",
        })
    }

})

module.exports = router;