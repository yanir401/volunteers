import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { eventSchema } from "./event.schema.js";

eventSchema.statics.isAllowedToModify = async (eventId, user) => {
  const event = await Event.findById(eventId);
  if (!event) throw new Error("Something went wrong");
  if (!user._id.equals(event.author)) throw new Error("Something went wrong");

  return event;
};

// userSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign(
//     { _id: user._id.toString() },
//     process.env.JWT_TOKEN_SECRET
//   );

//   user.tokens = user.tokens.concat({ token });
//   return token;
// };

// userSchema.statics.findByCredentials = async (email, password) => {
//   const user = await User.findOne({ email });
//   if (!user) throw new Error("Something went wrong");
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) throw new Error("Something went wrong");

//   return user;
// };

// userSchema.pre("save", async function (next) {
//   const user = this;
//   console.log(user.password);
//   if (user.isModified("password")) {
//     const password = await bcrypt.hash(user.password, 12);
//     user.password = password;
//   }

//   next();
// });

// eventSchema.methods.toJSON = function () {
//   const event = this;
//   eventObject = event.toObject();

//   eventObject.author

//   console.log("event22", event);
// };

export const Event = mongoose.model("events", eventSchema);
