const app = require('./app');
const connectDB = require("./config/db")
connectDB.connectDB();

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});
module.exports = app;