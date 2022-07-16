import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js";
// import "dotenv/config";
import { fileURLToPath } from "url";
import path from "path";

import { eventRouter } from "./routes/events.route.js";
import { userRouter } from "./routes/users.route.js";

const app = express();

// app.use(express.static(publicPath));
var router = express.Router();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());
router.get("/", function (req, res, next) {
  res.status(200).send("Hi, It works!");
});
app.use("/users", userRouter);
app.use("/events", eventRouter);

export { app };
