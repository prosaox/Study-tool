const express = require("express");
const app = express();
// if port 5000 not found, process.env.PORT will find available port
// const PORT = process.env.PORT || 5001;

// database connection
// connectDB.connectDB();

// define routes and API
app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/userApi"));
app.use("/api/auth", require("./routes/authApi"));
app.use("/api/courses", require("./routes/courseApi"));
app.get("/", (req, res) => {
    res.send("App up");
});
module.exports = app;