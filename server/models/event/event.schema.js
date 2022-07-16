import mongoose from "mongoose";
import validator from "validator";

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    minLength: 2,
  },
  date: {
    type: Date,
    required: true,
    minLength: 2,
    validate(value) {
      const today = new Date();
      if (value < today) throw new Error("Invalid Date!");
    },
  },
  dateString: { type: String },
  time: {
    type: String,
    required: true,
  },

  summary: {
    type: String,
    required: true,
    minLength: 4,
  },

  region: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
    minLength: 3,
  },

  volunteers: [{ type: mongoose.Schema.Types.ObjectId }],

  // missions: [
  //   {
  //     title: {
  //       type: String,
  //       required: true,
  //       minLength: 2,
  //     },
  //     assignedTo: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "users",
  //     },
  //   },
  // ],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

export { eventSchema };
