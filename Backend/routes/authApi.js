const express = require("express");

const rounter = express.Router();

const User = require("../models/User");

const auth = require("../middleware/authorization");

rounter.get("/", auth, async (req, res)=> {
    try {
        const user = await User.findById(req.user.id).select("-password") ;
        console.log(user);
        res.json(user);
    } catch (error) {
        console.log(error.message);
    }    
});

module.exports = rounter ;