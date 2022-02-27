const express = require("express");
const app = express();
const connectDB = require("./config/db")

// if port 5000 not found, process.env.PORT will find available port
const PORT = process.env.PORT || 5001;

// database connection
connectDB();

// define routes and API
app.use(express.json({ extended: false}));
app.use("/api/users", require("./routes/userApi"));

app.get("/", (req, res) => {
    res.send("App up");
});

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});