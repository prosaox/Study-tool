const express = require("express");

const router = express.Router();

const {check, validationResult } = require("express-validator") ;

const bcrypt = require("bcryptjs");

const User = require("../models/User");

const jwt = require("jsonwebtoken");

const config = require("../config/keys");

router.get("/", async(req, res)=> {
    try {
        const users = await User.find();
        res.json(users);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
});


router.post("/", [check("name", "Name is required").not().isEmpty(), 
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
            return res.status(400).json({errors: [{msg: "Email already exists. "}] });
        }
        user = new User ({
            name, 
            email, 
            password,
        });

        const salt = await bcrypt.genSalt(10) ;
        user.password = await bcrypt.hash(password, salt) ;

        user.save() ;
        const payload = {
            user:{
                id: user.id,
            },
        };

        jwt.sign(payload, config.jwtSecret, {expiresIn: 3600*24 },
        (err, token) => {
            if(err) throw err;
            res.json({token});
        }
        ) ;
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }

    
} );



router.put("/update/:id", async(req, res) => {

    const {id: _id} = req.params;
    const {name: name} = req.body;
    const {description : description} = req.body;

    const newUser = {
        _id,
        name,
        description,
    }

    User.findByIdAndUpdate(
        _id,
        newUser,
        (err, updateUser) => {
            if (err) {
                return res.status(400).json({msg:"User was not found"});
            }
            
            else {
                res.json(newUser);
            }
        }
    )
});


module.exports = router ;