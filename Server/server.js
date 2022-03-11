const express = require("express");
const app = require("./app");
const cors = require("cors");
const connectDB = require("./config/db")

// if port 5001 not found, process.env.PORT will find available port
const PORT = 5001;

// database connection
connectDB.connectDB();
app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});
module.exports = app;