const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const { fileFilter, fileStorage } = require("./config/multerConfig1")
const multer = require("multer")
// import connection DB func
const { connectDB } = require("./config/db");

// import routes
const usersRoute = require("./routes/apis")
const adminRoute = require("./routes/admin-apis")
const postRoute = require("./routes/apis")
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const morgan = require('morgan')

dotenv.config()

const app = express();

// Middlewares
app.use(express.json());
app.use(
    multer({
      storage: fileStorage,
      fileFilter: fileFilter
    }).fields([
      {
        name: "file",
        maxCount: 1
      },
      {
        name: "ad_video",
        maxCount: 1
      },
      {
        name: "reciepts",
        maxCount: 12
      },
      {
        name: "doc_schedule",
        maxCount: 1
      }
    ])
);
app.use(morgan('dev'))

// Routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/users", adminRoute);
app.use("/api/v1/posts", postRoute);
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/v1/orders", orderRoute)
app.use("/api/v1/products", productRoute)

const PORT = process.env.PORT || 5000;

// connect DB
connectDB()

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))