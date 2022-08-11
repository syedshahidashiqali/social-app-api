const mongoose = require("mongoose");


const connectDB = () => {
    const uri = process.env.MONGODB_URI;

    const connection = mongoose.connection;

    mongoose.connect(uri)
    mongoose.set('debug', true);
    connection.once("open", () => console.log("MongoDB Database connection has been established successfully."));
}

module.exports = { connectDB };