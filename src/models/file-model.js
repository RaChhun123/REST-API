const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fieldname: { type: String, required: true },
  originalname: { type: String, required: true },
  encoding: { type: String, required: true },
  mimetype: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("File", fileSchema);
