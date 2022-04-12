const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ExamSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    
    title: {
        type: String,
        require: true
    },
    current: {
        type: Number,
    },
    distribute: {
        type: Number,
        require: true
    },
});

const Exam = mongoose.model("Exam", ExamSchema);
module.exports = Exam;