const { loginService, registerService } = require("../services/authService");

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  console.log("Registering user:", { name, email, password });
  try {
    const user = await registerService({ name, email, password });
    console.log("User registered successfully:", user);
    res.status(201).json({
      code: 201,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        articles: user.articles,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await loginService(email, password);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        articles: user.articles,
        role: user.role,
        status: user.status,
        token: user.token,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerController,
  loginController,
};
