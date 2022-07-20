const express = require("express");
const dotenv = require("dotenv");

// import connection DB func
const { connectDB } = require("./config/db");

// import routes
const usersRoute = require("./routes/apis")
const adminRoute = require("./routes/admin/admin-apis")
const postRoute = require("./routes/apis")

dotenv.config()

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/users", adminRoute);
app.use("/api/v1/posts", postRoute);

const PORT = process.env.PORT || 5000;

// connect DB
connectDB()

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))