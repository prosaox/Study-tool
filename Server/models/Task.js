const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },

    courseId: {
        type: Schema.Types.ObjectId,
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
    due_date: {
        type: Date,
        require: true
    }
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;