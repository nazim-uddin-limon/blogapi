const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserByEmail, createUser } = require("./userService");

const registerService = async ({ name, email, password }) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    console.log("No existing user found, proceeding to register");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    });
    if (!user) {
      throw new Error("User registration failed");
    }
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error registering user: " + error.message);
  }
};

const loginService = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      articles: user.articles,
      role: user.role,
      status: user.status,
      token,
    };
  } catch (error) {
    throw new Error("Error logging in: " + error.message);
  }
};

module.exports = {
  registerService,
  loginService,
};
