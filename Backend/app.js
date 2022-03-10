const express = require("express");
const app = express();

// define routes and API
app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/userApi"));
app.use("/api/auth", require("./routes/authApi"));
app.use("/api/courses", require("./routes/courseApi"));

app.get("/", (req, res) => {
    res.status(200).send("App up");
});
module.exports = app;