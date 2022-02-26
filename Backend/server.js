const express = require("express");
const app = express();
const connectDB = require("./config/db")

// if port 5000 not found, process.env.PORT will find available port
const PORT = process.env.PORT || 5001;

// database connection
connectDB();

app.get("/", (req, res) => {
    res.send("App up");
});

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});