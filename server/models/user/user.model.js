import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { userSchema } from "./user.schema.js";
import { sendEmail } from "../../nodeMailer/nodeMailer.js";

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_TOKEN_SECRET
  );

  user.tokens = user.tokens.concat({ token });
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Something went wrong");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Something went wrong");

  return user;
};

userSchema.statics.findVolunteer = async (userId, location, event) => {
  const split = location.split(" ");
  const users = await User.find({
    volunteerLocations: {
      $regex: location,
    },
  });
  if (users) {
    const filteredUsers = users.filter((user) => !user._id.equals(userId));
    console.log("filteredUsers", { filteredUsers });
    filteredUsers.forEach((user) => sendEmail(event, user));
  }

  // const users = await User.find({
  //   $expr: { $in: [location, "$volunteerLocations"] },
  // });
  if (!users) throw new Error("Volunteers not found");
  return users;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const password = await bcrypt.hash(user.password, 12);
    user.password = password;
  }

  next();
});

export const User = mongoose.model("users", userSchema);
