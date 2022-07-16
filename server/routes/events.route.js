import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  getNearByEvents,
  getUserEvents,
  joinToEvent,
  leaveEvent,
  updateEvent,
} from "../controllers/events.controller.js";

import { auth } from "../middleware/auth.js";

export const eventRouter = express.Router();

eventRouter.post("/create", auth, createEvent);
eventRouter.patch("/update", auth, updateEvent);
eventRouter.delete("/delete", auth, deleteEvent);
eventRouter.patch("/joinToEvent", auth, joinToEvent);
eventRouter.patch("/leaveEvent", auth, leaveEvent);
eventRouter.get("/event", auth, getEvent);
eventRouter.get("/nearby-event", auth, getNearByEvents);
eventRouter.get("/allEvents", auth, getAllEvents);
eventRouter.get("/userEvents", auth, getUserEvents);

// eventRouter.post("/close", auth, closeEvent); maybe add this to close event after completed
