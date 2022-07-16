import { User } from "../models/user/user.model.js";

export const addNewUser = async (req, res) => {
  const userBody = req.body;
  console.log(userBody);

  try {
    const user = new User(userBody);
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, msg: "התרחשה שגיאה אנא נסה שוב" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    if (!user) throw new Error("Error: User not found");
    const token = await user.generateAuthToken();
    await user.save();
    res.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

export const getUserProfile = async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("Error: User not found");

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

export const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
