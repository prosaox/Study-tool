const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now() 
    },
    description:{
        type: String,
        required: false
    },
    degree:{
        type: String,
        required: false
    },
    school:{
        type: String,
        required: false
    }
});


const User = mongoose.model("User",UserSchema);

module.exports = User ;