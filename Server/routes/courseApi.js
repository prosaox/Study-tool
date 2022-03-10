const express = require("express")
const router = express.Router();
const auth = require("../middleware/authorization");
const {check, validationResult } = require("express-validator");

const Course = require("../models/Course");
const { response } = require("express");

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

// get all courses
router.get("/", async(req, res)=> {
    try {
        const courses = await Course.find();
        res.json(courses);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
});

// get course by Id
router.get("/:id", async(req, res)=> {
    try {
        const courseById = await Course.findById(req.params.id);

        if(!courseById) {
            return res.status(400).json({msg:"Product was not found"});
        }

        res.json(courseById);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
});

module.exports = router; 