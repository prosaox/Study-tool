const app = require('./app');
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5001;

connectDB.connectDB();

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});
module.exports = app;