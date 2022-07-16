import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js";
// import "dotenv/config";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { eventRouter } from "./routes/events.route.js";
import { userRouter } from "./routes/users.route.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = join(__dirname, "../client/build");

app.use(express.static(publicPath));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/events", eventRouter);

export { app };
