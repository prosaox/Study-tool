const { default: mongoose } = require("mongoose");
const mongose = require("mongoose");
const config = require("./keys");
// const { MongoMemoryServer } = require('mongodb-memory-server');

const db = config.mongoURI;

// mongoose documentation for database connection
const connectDB = async() => {
    try {
        await mongoose.connect(db)
        console.log("Connected to the database");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

const closeDatabase = async() => {
    await mongoose.connection.close();
}

module.exports.connectDB = connectDB;
module.exports.closeDatabase = closeDatabase;
// module.exports.clearDatabase = async() => {
//     const collections = mongoose.connection.collections;
//     for (const keys in collections) {
//         const collection = collections[key];
//         await collection.deleteMany;
//     }
// }