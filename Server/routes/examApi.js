const express = require("express")
const router = express.Router();
const auth = require("../middleware/authorization");
const {check, validationResult } = require("express-validator");

const Exam = require("../models/Exam");
const { response } = require("express");

router.post(
    "/", 
    [auth, [check("title", "Title is Required").not().isEmpty(),check("distribute", "Need distribution").not().isEmpty(),check("day", "Need date").not().isEmpty()]] ,async(req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        try {

            const {courseId, title,current, distribute,day} = req.body;
            const newExam = new Exam({
                courseId,
                title,
                current,
                distribute,
                day,
            });
            const exam = await newExam.save();
            res.json({exam});
        }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
        }
});
//get all exam in a course
router.get("/:id", async(req, res)=> {
    try {
        const exams = await Exam.find({courseId:req.params.id}).sort({'day': 'asc'})
        res.json(exams);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
});
router.put("/update/:id", async(req, res) => {

    const {id: _id} = req.params;
    const {title: title} = req.body;
    const {current : current} = req.body;
    const {distribute : distribute} = req.body;
    const {day : day} = req.body;
    const newExam = {
        _id,
        title,
        current,
        distribute,
        day
    }

    Exam.findByIdAndUpdate(
        _id,
        newExam,
        (err, updateExam) => {
            if (err) {
                return res.status(400).json({msg:"Task was not found"});
            }
            else {
                res.json(newExam);
            }
        }
    )
});
//delete an exam using id
router.delete("/delete/:id", async (req, res) => {
    try {
        await Exam.deleteOne({_id: req.params.id});
        res.status(204).send(" Exam Deleted");
    } catch(err) {
        res.status(400).send("Couldn't Find the Exam");
    }
});
module.exports = router; 

