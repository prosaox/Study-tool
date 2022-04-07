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
        }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
        }
});
router.get("/", async(req, res)=> {
    try {
        const cards = await Flashcard.find();
        res.json(cards);
    }catch(error) {
            console.error(error.message);
            res.status(500).send("Server error")
    }
});