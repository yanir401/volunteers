import dotenv from "dotenv";
dotenv.config();
export const { PORT, MONGO_URI, EMAIL_KEY, MONGO_USER, MONGO_PASSWORD } =
  process.env;
