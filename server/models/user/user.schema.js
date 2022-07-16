import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  // age: {
  //   type: Number,
  //   required: true,
  //   minLength: 2,
  // },
  email: {
    type: String,
    index: true,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email!");
      }
    },
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
    validate(str) {
      if (!validator.isMobilePhone(str, ["he-IL"])) {
        throw new Error("Invalid phone number!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },

  latLong: {
    type: [Number],
    required: true,
  },

  address: {
    type: String,
    // required: true,
    minLength: 3,
  },
  volunteerLocations: { type: String, required: true },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

export { userSchema };
