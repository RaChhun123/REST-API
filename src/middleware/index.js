module.exports = {
  ...require("./auth.middleware"),
  ...require("./error.middleware"),
  ...require("./validation.middleware"),
  ...require("./cache.middleware"),
  ...require("./upload.middleware"),
};
