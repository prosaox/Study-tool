const { default: mongoose } = require("mongoose");
const mongose = require("mongoose");
const config = require("./keys");
const db = config.mongoURI;

// mongoose documentation for database connection
const connectDB = async() => {
    try {
        await mongoose.connect(db)
        console.log("Connected to the database");
    }catch(err) {
        console.log("Connection failed");
        process.exit(1);
    }
};

module.exports = connectDB;