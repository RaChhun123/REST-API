const asyncHandler = require("express-async-handler");
const userModel = require("../../models/user-model");
const { ExtractJwt, Strategy } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_SECRET,
};

const jwtStrategy = new Strategy(
  opts,
  asyncHandler(async (jwt_payload, done) => {
    const user = await userModel.findById(jwt_payload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  }),
);

module.exports = jwtStrategy;
