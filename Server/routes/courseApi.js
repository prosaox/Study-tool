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
            return res.status(400).json({ errors: errors.array()});
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

router.put("/update/:id", async(req, res) => {

    const {id: _id} = req.params;
    const {name: name} = req.body;
    const {description : description} = req.body;
    const {start_date : start_date} = req.body;
    const {end_date : end_date} = req.body;
    const {current_grade : current_grade} = req.body;
    const {target_grade : target_grade} = req.body;
    const newCourse = {
        _id,
        name,
        description,
        start_date,
        end_date,
        current_grade,
        target_grade
    }

    Course.findByIdAndUpdate(
        _id,
        newCourse,
        (err, updateCourse) => {
            if (err) {
                return res.status(400).json({msg:"Course was not found"});
            }
            
            else {
                res.json(newCourse);
            }
        }
    )
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
            return res.status(400).json({msg:"Course was not found"});
        }

        res.json(courseById);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        await Course.deleteOne({_id: req.params.id});
        res.status(204).send(" Course Deleted");
    } catch(err) {
        res.status(400).send("Couldn't Find the Course");
    }
})


module.exports = router; 