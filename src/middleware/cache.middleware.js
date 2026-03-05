const asyncHandler = require("express-async-handler");
const { responseHandler } = require("express-intercept");
const redisClient = require("../config/redis");

//insert data to cache
const cacheInterceptor = (ttl) =>
  responseHandler()
    .for((req) => req.method === "GET")
    .if((res) => res.statusCode === 200)
    .getString(async (body, req, res) => {
      const { originalUrl } = res.req;
      await redisClient.set(originalUrl, body, { EX: ttl });
    });

// clear cache
const invalidateInterceptor = responseHandler()
  .for((req) => {
    const methods = ["POST", "PUT", "PATCH", "DELETE"];
    return methods.includes(req.method);
  })
  .if((res) => {
    const codes = [200, 201, 202, 203, 204];
    return codes.includes(res.statusCode);
  })
  .getString(async (body, req, res) => {
    const { baseUrl } = req;
    const keys = await redisClient.keys(`${baseUrl}*`);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  });

// check cache whether it has or not
const cacheMiddleware = asyncHandler(async (req, res, next) => {
  if (req.method === "GET") {
    const { originalUrl } = req;
    const data = await redisClient.get(originalUrl);

    if (data !== null) {
      return res.send(JSON.parse(data));
    }
  }

  next();
});

module.exports = {
  cacheInterceptor,
  cacheMiddleware,
  invalidateInterceptor,
};
