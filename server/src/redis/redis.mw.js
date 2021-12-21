const redis = require("./redis");

// Format Redis Keys
const formatRedisKey = (key, reqParams) => {
  const { name, params } = key;
  let redisKey = name;
  params.map((param) => {
    const val = reqParams[param];
    redisKey = redisKey + "_" + param + ":" + val.trim();
  });

  return redisKey.trim().toLowerCase();
};

module.exports = {
  cacheData: (key, reqParams, data) => {
    redis.set(formatRedisKey(key, reqParams), JSON.stringify(data), {
      EX: key.expiresIn,
    });
  },
  getCacheData: (key) => async (req, res, next) => {
    const redisKey = formatRedisKey(key, { ...req.params, ...req.body });
    const data = await redis.get(redisKey);

    // Checking if there is a callback for a certain redis key
    if (key.callback) return key.callback(data, req, next);

    // Checking if Data exists
    if (!data) return next();

    const cachedData = JSON.parse(data);
    return res.status(200).json({ ...cachedData });
  },
};
