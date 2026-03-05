const asyncHandler = require("express-async-handler");
const fileModel = require("../models/file-model");

const singleUpload = asyncHandler(async (req, res) => {
  const file = await fileModel.create(req.file);
  res.send(file);
});

const multipleUpload = asyncHandler(async (req, res) => {
  if (req.files.length < 1) {
    req.files = undefined;
  }
  const file = await fileModel.insertMany(req.files);

  res.send(file);
});

module.exports = { singleUpload, multipleUpload };
