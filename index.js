const https = require("https");
const http = require("http");
const app = require("./app");
const fs = require("fs");
const redisClient = require("./config/db");
require("dotenv").config();
const {
  SERVER_PORT: port,
  SECURE_SERVER_PORT: secure,
  HOST: host,
} = process.env;

const Server = async function () {
  try {
    await redisClient.on("connect", function () {
      console.log("redis connection established");
    });

    await redisClient.on("error", (err) =>
      console.log("Redis Client Error", err)
    );

    console.log("Database connectivity established successfully");
    const serverPort = port || 80;
    const httpServer = http.createServer(app);
    httpServer.listen(serverPort, () => {
      console.log(
        ` order/client-:API backend server started @ http://${host}:${serverPort}/ `
      );
    });
  } catch (err) {
    console.log("server setup failed", err);
    console.log("Error: ", err.message);
  }
};

Server();