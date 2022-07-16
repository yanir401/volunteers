import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js";
// import "dotenv/config";
import { fileURLToPath } from "url";
import path from "path";

import { eventRouter } from "./routes/events.route.js";
import { userRouter } from "./routes/users.route.js";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log("directory-name 👉️", __dirname);

// 👇️ "/home/borislav/Desktop/javascript/dist/index.html"

const publicPath = path.join(__dirname, "../client/build");

const app = express();

app.use(express.static(publicPath));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/events", eventRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
export { app };
