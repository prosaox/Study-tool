const express = require("express")
const router = express.Router();
const auth = require("../middleware/authorization");
const {check, validationResult } = require("express-validator");

const FlashCard = require("../models/FlashCard");
const { response } = require("express");

router.post(
    "/", 
    [auth, [check("title", "Title is Required").not().isEmpty()]] ,async(req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        
        try {

            const {courseId, title, content} = req.body;
            const newFlashcard = new FlashCard({
                userId: req.user.id,
                courseId,
                title,
                content,
            });

            const flashcard = await newFlashcard.save();
            res.json({flashcard});
        }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
        }
});

router.get("/", async(req, res)=> {
    try {
        const flashcards = await FlashCard.find();
        res.json(flashcards);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
});

module.exports = router; 
