const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const userModel = require("../models/user-model");
const JWT = require("jsonwebtoken");
const signJWT = require("../utils");

const signUp = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });
  const { password, ...userResponse } = user.toObject();
  res.send(userResponse);
});

const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email }).select("+password");

  if (!user) {
    throw new Error("CastError");
  }

  const compareResult = await bcrypt.compare(password, user.password);
  if (!compareResult) {
    throw new Error("password not match");
  }

  //Sign JWT Token
  const { accessToken, refreshToken } = signJWT(
    user._id,
    user.email,
    user.username,
  );

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  user.refreshToken = hashedRefreshToken;
  await user.save();

  res.send({ accessToken, refreshToken });
});

const showMe = asyncHandler((req, res) => {
  res.send(req.user);
});

const exchahngeToken = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }

  const refreshTokenFromClient = authHeader.split(" ")[1];

  const decoded = JWT.verify(
    refreshTokenFromClient,
    process.env.JWT_REFRESH_SECRET,
  );

  const user = await userModel.findById(decoded.id).select("+refreshToken");
  if (!user || !user.refreshToken) {
    return res.status(401).send("Unauthorized");
  }

  const compareResult = await bcrypt.compare(
    refreshTokenFromClient,
    user._doc.refreshToken,
  );
  if (!compareResult) {
    return res.status(401).send("Refresh token mismatch");
  }

  //Generate new tokens
  const { accessToken, refreshToken } = signJWT(
    user._doc._id,
    user._doc.email,
    user._doc.username,
  );

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  user.refreshToken = hashedRefreshToken;
  await user.save();

  res.send({ accessToken, refreshToken });
});

module.exports = { signUp, logIn, showMe, exchahngeToken };
