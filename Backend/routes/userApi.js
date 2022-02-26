const express = require("express");

const rounter = express.Router();

const {check, validationResult } = require("express-validator") ;

const bcrypt = require("bcryptjs");

const User = require("../models/User")

rounter.get("/", (req, res)=> res.send("User route.") );

rounter.post("/", [check("name", "Name is required").not().isEmpty(), 
                    check("email", "Please enter valid email").isEmail(),
                    check("password", "Password should have 5 chars").isLength({min: 5})],
                    async (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const {name, email, password } = req.body ;
        let user = await User.findOne({email: email });
        if (user) {
            return res.status(400).json({errors: [{msg: "User already exists. "}] });
        }
        user = new User ({
            name, 
            email, 
            password,
        });

        const salt = await bcrypt.genSalt(10) ;
        user.password = await bcrypt.hash(password, salt) ;

        user.save() ;
        res.send("User created");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }

    
} );

module.exports = rounter ;