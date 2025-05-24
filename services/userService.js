const User = require("../models/User");
const createUser = ({
  name,
  email,
  password,
  avatar = "",
  articles = [],
  role = "user",
  status = "active",
}) => {
  const user = new User({
    name,
    email,
    password,
    avatar,
    articles,
    role,
    status,
  });
  return user;
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};
const updateUser = async (id, updateData) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    Object.keys(updateData).forEach((key) => {
      user[key] = updateData[key];
    });
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
};
