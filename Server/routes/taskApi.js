const express = require("express")
const router = express.Router();
const auth = require("../middleware/authorization");
const {check, validationResult } = require("express-validator");

const Task = require("../models/Task");
const { response } = require("express");

router.post(
    "/", 
    [check("name", "Name is Required").not().isEmpty(),check("due_date", "deadline is Required").not().isEmpty()] ,async(req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        
        try {

            const {userId,courseId, name, description, start_date, due_date} = req.body;
            const newTask = new Task({
                userId,
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
        const tasks = await Task.find({"$gte" : [ "$due_date" , new Date() ]} ).sort({'due_date': 'asc'});
        res.json(tasks);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
});
// get task by user Id

router.get("/:id", async(req, res)=> {
    try {
        // var d = Date.now();
        // d.setDate(d.getDate()+7);
        const tasks = await Task.find({userId:req.params.id,'due_date': {"$gte": Date.now()}} ).sort({'due_date': 'asc'});
        res.json(tasks);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
});
// get task by course Id

router.get("/course/:id", async(req, res)=> {
    try {
        // var d = Date.now();
        // d.setDate(d.getDate()+7);
        const tasks = await Task.find({courseId:req.params.id,'due_date': {"$gte": Date.now()}} ).sort({'due_date': 'asc'});
        res.json(tasks);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
});


module.exports = router; 