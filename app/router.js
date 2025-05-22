const router = require("express").Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    code: 200,
    data: {
      message: "Success",
      description: "Application health is ok",
    },
  });
});

router.use(require("../routes"));

module.exports = router;
