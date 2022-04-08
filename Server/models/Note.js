const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    date: {
        type: Date,
        require: true
    },
    content: {
        type: String,
    },
});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;