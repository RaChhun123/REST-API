const express = require("express");
//configure dotenv
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./src/config/db.js");
const {
  handleError,
  verifyJWT,
  cacheMiddleware,
  cacheInterceptor,
  invalidateInterceptor,
} = require("./src/middleware/index.js");
const passport = require("passport");
const jwtStrategy = require("./src/common/strategy/jwt.js");
const redisClient = require("./src/config/redis.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
const { rateLimit } = require("express-rate-limit");

//port
const PORT = process.env.PORT || 4000;

//Database connection
connectDB();
//Redis connection
redisClient.connect();

//rest object
const app = express();

//rate-limit
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});

//middlewares
app.use(limiter);
passport.use(jwtStrategy);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).send({ status: "healthy" });
});

//routes
app.use("/api/v1/auth", require("./src/routes/auth-route.js"));
app.use("/api/v1/files", require("./src/routes/file-route.js"));

// cache redis
// app.use(cacheMiddleware);
// app.use(cacheInterceptor(30 * 60));
// app.use(invalidateInterceptor);

// app.use("/api/v1/user", verifyJWT, require("./src/routes/user-route.js"));
app.use(
  "/api/v1/users",
  passport.authenticate("jwt", { session: false }),
  cacheMiddleware,
  cacheInterceptor(30 * 60),
  invalidateInterceptor,
  require("./src/routes/user-route.js"),
);

// handle error
app.use(handleError);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
