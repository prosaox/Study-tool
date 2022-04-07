const express = require("express")
const router = express.Router();
const auth = require("../middleware/authorization");
const {check, validationResult } = require("express-validator");

const { response } = require("express");
const Flashcard = require("../models/Flashcard");

router.post(
    "/", 
    [auth, [check("word", "Word is Required").not().isEmpty()]] ,async(req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        
        try {
            const {courseId, name, description} = req.body;
            const newCard = new Flashcard({
                userId: req.user.id,
                courseId,
                word,
                definition,
            });
            const card = await newCard.save();
            res.json({card});
const FlashCard = require("../models/FlashCard");
const { response } = require("express");

router.post(
    "/", 
    [auth, [check("title", "Title is Required").not().isEmpty()]] ,async(req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.statusCode(400).json({ errors: errors.array()});
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
        const cards = await Flashcard.find();
        res.json(cards);

router.get("/", async(req, res)=> {
    try {
        const flashcards = await FlashCard.find();
        res.json(flashcards);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
});


router.get("/:id", async(req, res)=> {
    try {
        const flashcardById = await FlashCard.findById(req.params.id);

        if(!flashcardById) {
            return res.status(400).json({msg:"Flashcard was not found"});
        }

        res.json(flashcardById);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
});
});

module.exports = router; 
