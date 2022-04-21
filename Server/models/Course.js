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
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    current_grade:{
        type:Number,
    },
    target_grade:{
        type:Number,
    },
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;