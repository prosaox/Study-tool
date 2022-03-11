const { default: mongoose } = require("mongoose");
const mongose = require("mongoose");
const config = require("./keys");
const db = config.mongoURI;

// mongoose documentation for database connection
const connectDB = async() => {
    try {
        await mongoose.connect(db)
        console.log("Connected to the database");
    } catch (err) {
        console.log("Connection failed");
        process.exit(1);
    }
};
const closeDatabase = async() => {
    await mongoose.connection.close();
}
const clear = async() => {
    await mongoose.connection.dropDatabase();
}
module.exports.clear = clear;
module.exports.connectDB = connectDB;
module.exports.closeDatabase = closeDatabase;