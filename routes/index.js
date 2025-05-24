const router = require("express").Router();

router.use("/auth", require("./authRoute"));

// Article route
router.use("/articles", require("./articleRoute"));

module.exports = router;
