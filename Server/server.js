const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db")

// if port 5001 not found, process.env.PORT will find available port
const PORT = 5001;

app.use(cors());
// database connection
connectDB();

// define routes and API
app.use(express.json({ extended: false}));
app.use("/api/users", require("./routes/userApi"));
app.use("/api/auth", require("./routes/authApi")) ;
app.use("/api/courses", require("./routes/courseApi"));

app.get("/", (req, res) => {
    res.send("App up");
});

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});