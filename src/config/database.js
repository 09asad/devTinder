const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://asad09:asad7007258011@asad09.ohua2le.mongodb.net/devTinder"
    );
};

module.exports = connectDB;