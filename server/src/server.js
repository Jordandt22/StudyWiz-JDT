require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const rateLimiter = require("express-rate-limit");
const slowDown = require("express-slow-down");
const connect = require("./models/db");
const app = express();

// Middleware
const { NODE_ENV, WEB_URL, API_VERSION } = process.env;
app.use(helmet());
app.use(
  cors({
    origin: NODE_ENV !== "production" ? "http://localhost:3000" : WEB_URL,
  })
);
app.use(express.json());
if (NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.enable("trust proxy");
  app.set("trust proxy", 1);
}

// Mongoose Connection
connect();

const timeLimit = 300000;
const maxReq = 25;
const limiter = rateLimiter({
  windowMs: timeLimit,
  max: maxReq,
});

const speedLimiter = slowDown({
  windowMs: timeLimit,
  delayAfter: maxReq,
  delayMs: 500,
});

// Rate & Speed Limiters
app.use(speedLimiter);
app.use(limiter);

// Routes
const version = `/v${API_VERSION}/api`;
app.use(version + "/user", require("./routes/api/user.api.route"));

// PORT and Sever
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`CORS Enabled Server, Listening to port: ${PORT}...`);
});
