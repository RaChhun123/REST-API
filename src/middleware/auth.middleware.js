const asyncHandler = require("express-async-handler");
const JWT = require("jsonwebtoken");

//verify JWT
const verifyJWT = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json("Unauthorized.");
  }

  const token = authHeader.split(" ")[1];

  const decoded = JWT.verify(token, process.env.JWT_ACCESS_SECRET);
  req.user = decoded;

  next();
});

module.exports = { verifyJWT };
