const redis = require("redis");
const { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD, NODE_ENV } = process.env;
const isProduction = NODE_ENV === "production";
const port = isProduction ? REDIS_PORT : 6379;
const host = isProduction ? REDIS_HOST : "localhost";

let client = null;
(async () => {
  // Creating a Redis Client
  client = redis.createClient({ port, host });

  // Production Password
  if (isProduction) client.auth(REDIS_PASSWORD);

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();
})();

// Checking Redis Client Connection
client.on("connect", () =>
  console.log(`Connected to Redis on Port: ${port}...`)
);

module.exports = client;
