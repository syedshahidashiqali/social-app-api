const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// import routes
const registerRoute = require("./routes/auth/auth")
dotenv.config()

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/users", registerRoute);

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

const connection = mongoose.connection;

mongoose.connect(uri)

connection.once("open", () => console.log("MongoDB Database connection has been established successfully."));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))