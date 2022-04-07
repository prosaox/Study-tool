const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FlashcardSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    word: {
        type: String,
        require: true
    },
    definition: {
        type: String,
    },
});
const Flashcard = mongoose.model("Flashcard", TaskSchema);
module.exports = Flashcard;