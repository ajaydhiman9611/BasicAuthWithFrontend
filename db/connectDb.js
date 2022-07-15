const mongoose = require("mongoose");
const configs = require("../utility/configs");

function connectDB() {
    mongoose
        .connect(configs.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Successfully connected to MongoDB!");
        })
        .catch(err => {
            console.error("Connection error", err);
            process.exit();
        });
}
module.exports = connectDB;