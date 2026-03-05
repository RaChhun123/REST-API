const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, select: false, default: "" },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: new Date() },
  refreshToken: { type: String, select: false },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],
});
userSchema.index({
  email: "text",
  username: "text",
});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema);
