const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FlashCardSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },

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

const FlashCard = mongoose.model("Task", FlashCardSchema);
module.exports = FlashCard;