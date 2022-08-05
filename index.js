const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const { fileFilter, fileStorage } = require("./config/multerConfig1")
const multer = require("multer")
// import connection DB func
const { connectDB } = require("./config/db");

// import routes
const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin")
const postRoutes = require("./routes/post")
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const reviewsRoutes = require("./routes/review");
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
app.use(cors())

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/v1/orders", orderRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/reviews", reviewsRoutes)

const PORT = process.env.PORT || 5000;

// connect DB
connectDB()

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))