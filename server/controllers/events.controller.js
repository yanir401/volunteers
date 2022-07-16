import mongoose from "mongoose";
import { Event } from "../models/event/event.model.js";
import { User } from "../models/user/user.model.js";

export const createEvent = async (req, res) => {
  const eventBody = req.body;
  try {
    const newEvent = new Event({ ...eventBody, author: req.user._id });
    newEvent.volunteers.push(req.user._id);
    const event = await newEvent.save();
    const volunteers = await User.findVolunteer(
      req.user._id,
      eventBody.region,
      event
    );
    res.status(201).send(eventBody);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const updateEvent = async (req, res) => {
  // not finished
  const { eventId, updateFields } = req.body;
  try {
    const event = await Event.isAllowedToModify(eventId, req.user);
    if (!event) throw new Error("Error: not found");

    //   event.updateEvent

    res.status(200).send({ event });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

export const deleteEvent = async (req, res) => {
  const { eventId } = req.query;
  try {
    const event = await Event.isAllowedToModify(eventId, req.user);
    if (!event) throw new Error("Error: not found");
    event.delete();
    res.status(200).send({ event });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

export const getEvent = async (req, res) => {
  const { id } = req.query;
  try {
    const event = await Event.findById(id).populate("author");
    if (!event) throw new Error("Error: not found");
    res.status(200).send(event);
  } catch (error) {
    res.status(401).send(error.message);
  }
};
export const getNearByEvents = async (req, res) => {
  try {
    const event = await Event.find({
      region: {
        $regex: req.user.volunteerLocations,
      },
    }).populate("author");
    if (!event) throw new Error("Error: not found");

    const updateEvent = [];

    event.forEach((event) => {
      let flag = true;
      for (const volunteer of event.volunteers) {
        console.log(event.eventName, volunteer.equals(req.user._id));
        if (volunteer.equals(req.user._id)) {
          flag = false;
          break;
        }
      }
      if (flag) updateEvent.push(event);
    });

    res.status(200).send(updateEvent);
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("author");
    if (!events) throw new Error("Error: not found");
    res.status(200).send(events);
  } catch (error) {
    res.status(401).send(error.message);
  }
};
export const getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({
      volunteers: mongoose.Types.ObjectId(req.user._id),
    }).populate("author");
    if (!events) throw new Error("Error: not found");
    res.status(200).send(events);
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

export const joinToEvent = async (req, res) => {
  const { _id } = req.query;
  try {
    const event = await Event.findById(_id);
    event.volunteers.push(req.user._id);
    await event.save();
    if (!event) throw new Error("Error: not found");
    res.status(200).send(event);
  } catch (error) {
    res.status(401).send(error.message);
  }
};
export const leaveEvent = async (req, res) => {
  const { eventId } = req.query;

  try {
    const event = await Event.findByIdAndUpdate(eventId, {
      $pull: {
        volunteers: req.user._id,
      },
    });

    await event.save();
    if (!event) throw new Error("Error: not found");
    res.status(200).send(event);
  } catch (error) {
    res.status(401).send(error.message);
  }
};
