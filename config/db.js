require("dotenv").config();
const Redis = require("ioredis");

const {
  REDIS_USERNAME: username,
  REDIS_PASSWORD: password,
  REDIS_PORT: port,
  REDIS_HOST: host,
} = process.env;

const redisClient = new Redis({
  host,
  port,
  //   password, // If applicable
  //   username, // If applicable
});

module.exports = redisClient;
