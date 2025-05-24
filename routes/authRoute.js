const router = require("express").Router();
const {
  loginController,
  registerController,
} = require("../controllers/authController");

router.post("/signup", registerController);
router.post("/signin", loginController);

module.exports = router;
