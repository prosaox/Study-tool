const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FlashCardSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
    },
});

const FlashCard = mongoose.model("FlashCard", FlashCardSchema);
module.exports = FlashCard;