const express = require("express")
const router = express.Router();
const auth = require("../middleware/authorization");
const {check, validationResult } = require("express-validator");

const FlashCard = require("../models/FlashCard");
const { response } = require("express");

router.post(
    "/", 
    [check("title", "Title is Required").not().isEmpty(),check("content", "content is Required").not().isEmpty()] ,async(req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        
        try {

            const {courseId, title, content} = req.body;
            const newFlashcard = new FlashCard({
                courseId,
                title,
                content,
            });

            const flashcard = await newFlashcard.save();
            res.json({flashcard});
        }catch(error) {
            // console.error(error.message);
            res.status(500).send("Server error")
        }
});

router.get("/:id", async(req, res)=> {
    try {
        const flashcards = await FlashCard.find({courseId:req.params.id});
        res.json(flashcards);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
});
router.delete("/delete/:id", async (req, res) => {
    try {
        await FlashCard.deleteOne({_id: req.params.id});
        res.status(204).send(" Card Deleted");
    } catch(err) {
        res.status(400).send("Couldn't Find the Card");
    }
});
module.exports = router; 
