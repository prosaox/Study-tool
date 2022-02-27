const express = require("express")
const router = express.Router();
const auth = require("../middleware/authorization");
const {check, validationResult } = require("express-validator");

const Course = require("../models/Course")

router.post(
    "/", 
    [auth, [check("name", "Name is Required").not().isEmpty()]] ,async(req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.statusCode(400).json({ errors: errors.array()});
        }
        
        try {
            const {name, description, start_date, end_date} = req.body;
            const newCourse = new Course({
                userId: req.user.id,
                name,
                description,
                start_date,
                end_date
            });
    
            const course = await newCourse.save();
            res.json({course});
        }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
        }
});

router.get("/", (req, res)=> res.send("Course route."));

module.exports = router; 