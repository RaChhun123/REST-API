const JWT = require("jsonwebtoken");

const signJWT = (id, email, username) => {
  //Sign JWT access Token

  const accessToken = JWT.sign(
    { id, email, username },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE },
  );
  //Sign JWT refresh Token
  const refreshToken = JWT.sign(
    { id, email, username },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE },
  );

  return { accessToken, refreshToken };
};

module.exports = signJWT;
