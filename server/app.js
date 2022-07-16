import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { eventRouter } from "./routes/events.route.js";
import { userRouter } from "./routes/users.route.js";

const app = express();

// app.use(express.static(publicPath));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, "../client/build");

app.use(express.static(publicPath));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/users", userRouter);
app.use("/events", eventRouter);

export { app };
