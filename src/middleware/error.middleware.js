//ERROR HANDLING
const handleError = (err, req, res, next) => {
  console.log(err);

  if (err.name === "JsonWebTokenError") {
    return res.status(401).send({
      success: false,
      message: err.message,
    });
  }

  if (err.message === "CastError") {
    return res.status(404).send({
      success: false,
      message: "Resource not found.",
    });
  }

  if (err.code === 11000) {
    return res.status(409).send({
      success: false,
      message: "Duplicate field value entered.",
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }

  if (err.message === "password not match") {
    return res.status(401).send({
      success: false,
      message: err.message,
    });
  }

  res.status(500).send({
    success: false,
    message: "Internal server error.",
    error: err.message,
  });
};

module.exports = { handleError };
