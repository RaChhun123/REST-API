const { checkSchema } = require("express-validator");

const signUpSchema = checkSchema({
  username: {
    trim: true,
    notEmpty: {
      errorMessage: "Username is required",
    },
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: "Username must be 3–20 characters",
    },
    isAlpha: {
      errorMessage: "User name contain text only",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Invalid email",
    },
    notEmpty: {
      errorMessage: "email is required",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "password is required",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars",
    },
  },
  confirmPassword: {
    custom: {
      options: (value, { req }) => {
        if (value != req.body.password) {
          throw new Error("password not match");
        }
        return true;
      },
    },
  },
});

module.exports = { signUpSchema };
