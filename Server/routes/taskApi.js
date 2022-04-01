const express = require("express")
const router = express.Router();
const auth = require("../middleware/authorization");
const {check, validationResult } = require("express-validator");

const Task = require("../models/Task");
const { response } = require("express");

router.post(
    "/", 
    [auth, [check("name", "Name is Required").not().isEmpty()]] ,async(req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.statusCode(400).json({ errors: errors.array()});
        }
        
        try {

            const {courseId, name, description, start_date, due_date} = req.body;
            const newTask = new Task({
                userId: req.user.id,
                courseId,
                name,
                description,
                start_date,
                due_date
            });
    
            const task = await newTask.save();
            res.json({task});
        }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
        }
});

// get all tasks
router.get("/", async(req, res)=> {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
});
// get task by Id
router.get("/:id", async(req, res)=> {
    try {
        const taskById = await Task.findById(req.params.id);

        if(!taskById) {
            return res.status(400).json({msg:"Task was not found"});
        }

        res.json(taskById);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
});


module.exports = router; 