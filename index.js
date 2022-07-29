const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const { fileFilter, fileStorage } = require("./config/multerConfig1")
const multer = require("multer")
// import connection DB func
const { connectDB } = require("./config/db");

// import routes
const authRoutes = require("./routes/authRoutes")
const adminRoutes = require("./routes/adminRoutes")
const postRoutes = require("./routes/postRoutes")
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
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
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin/users", adminRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/v1/orders", orderRoutes)
app.use("/api/v1/products", productRoutes)

const PORT = process.env.PORT || 5000;

// connect DB
connectDB()

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))