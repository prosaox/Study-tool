const express = require("express")
const router = express.Router();
const auth = require("../middleware/authorization");
const {check, validationResult } = require("express-validator");

const Exam = require("../models/Exam");
const { response } = require("express");

router.post(
    "/", 
    [auth, [check("title", "Title is Required").not().isEmpty(),check("distribute", "Need distribution").not().isEmpty()]] ,async(req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        try {

            const {courseId, title,current, distribute} = req.body;
            const newExam = new Exam({
                courseId,
                title,
                current,
                distribute,
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
        const exams = await Exam.find({courseId:req.params.id});
        res.json(exams);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
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

