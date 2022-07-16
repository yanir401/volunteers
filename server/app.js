import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js";
import { eventRouter } from "./routes/events.route.js";
import { userRouter } from "./routes/users.route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/events", eventRouter);

export { app };
