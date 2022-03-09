const app = require('./app');
const db = require("./config/db")

// if port 5000 not found, process.env.PORT will find available port
const PORT = process.env.PORT || 5001;

// database connection


app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
    db.connectDB();
});

module.exports = app;