const multer = require("multer");
const path = require("path");

// set storage engine
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const singleFileUpload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, //1MB limit
  //check file type
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

const multipleFileUpload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, //10MB limit
  //check file type
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("files");

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mine
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Images Only!"), false);
  }
}

module.exports = {
  singleFileUpload,
  multipleFileUpload,
};
