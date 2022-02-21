const express = require("express");
const app = express();

// if port 5000 not found, process.env.PORT will find available port
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("App up");
});

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});