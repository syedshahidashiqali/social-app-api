const mongoose = require("mongoose");


const connectDB = () => {
    const uri = process.env.MONGODB_URI;
    
    const connection = mongoose.connection;

    mongoose.connect(uri)

    connection.once("open", () => console.log("MongoDB Database connection has been established successfully."));
}

module.exports = { connectDB };