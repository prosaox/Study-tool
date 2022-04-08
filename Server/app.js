const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

// define routes and API
app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/userApi"));
app.use("/api/auth", require("./routes/authApi"));
app.use("/api/courses", require("./routes/courseApi"));
app.use("/api/tasks", require("./routes/taskApi"));
app.use("/api/flashcards", require("./routes/flashcardApi"));
app.get("/", (req, res) => {
    res.send("App up");
});
module.exports = app;