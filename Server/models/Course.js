const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    start_date: {
        type: Date,
        default: Date.now()
    },
    end_date: {
        type: Date
    }
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;