const asyncHandler = require("express-async-handler");
const userModel = require("../models/user-model");
const paginate = require("mongoose-paginate-v2");
const { PaginationParameters } = require("mongoose-paginate-v2");

const getUsers = asyncHandler(async (req, res) => {
  // const query = {
  //   $text: {
  //     $search: "2026-01-07T18:43:43.742+00:00",
  //   },
  // };
  // const options = {
  //   page: 1,
  //   limit: 10,
  //   populate: "file",
  //   lean: true,
  // };
  const options = new PaginationParameters(req).get();
  console.log(...options);
  const users = await userModel.paginate(...options);

  res.send(users);
});

const getUserbyId = asyncHandler(async (req, res) => {
  const user = await userModel
    .findOne({ _id: req.params.id })
    .populate("files", "path")
    .select("-__v");
  if (!user) {
    throw new Error("CastError");
  }
  res.send(user);
});

const createUser = asyncHandler(async (req, res) => {
  const user = await userModel.create(req.body);
  res.send(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await userModel.updateOne({ _id: req.params.id }, req.body);
  if (!user.matchedCount) {
    throw new Error("CastError");
  }
  res.send({ message: "User record updated successfully" });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await userModel.deleteOne({ _id: req.params.id });

  console.log(user);
  if (!user.deletedCount) {
    throw new Error("CastError");
  }
  res.send({ message: "User record deleted successfully" });
});

module.exports = { getUsers, getUserbyId, createUser, updateUser, deleteUser };
