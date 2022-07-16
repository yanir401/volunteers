import mongoose from "mongoose";
import { MONGO_PASSWORD, MONGO_URI, MONGO_USER } from "../config/config.js";

mongoose.connect(
  `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.slbagi3.mongodb.net/?retryWrites=true&w=majority`,
  (error, mongoConnectionInstance) => {
    if (error) throw Error("Mongoose Connection!!, Error: " + error);
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      const { host, port, name } = mongoConnectionInstance;
      console.log({ host, port, name });
    }
  }
);
