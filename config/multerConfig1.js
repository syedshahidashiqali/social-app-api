const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let extension = file.originalname.split(".").pop();
    cb(null, uniqueSuffix + "." + extension);
  }
});

const fileFilter = (req, file, cb) => {
  console.log("file", file);
  if (
    file.fieldname === "file" ||
    "ad_video" ||
    file.fieldname === "reciepts" ||
    file.fieldname === "doc_schedule"
  ) {
    console.log("block1");
    if (
      file.mimetype.includes("image/") ||
      file.mimetype.includes("video/") ||
      file.mimetype.includes("application/pdf") ||
      file.mimetype.includes("application/msword") ||
      file.mimetype.includes(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) ||
      file.mimetype.includes(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.template"
      )
    ) {
      console.log("block2");

      cb(null, true);
    } else {
      cb(null, false);
    }
  } else {
    cb(null, false);
  }
};

module.exports = {
    fileStorage,
    fileFilter
}