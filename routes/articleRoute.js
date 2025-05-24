const router = require("express").Router();

const {
  articlePostController,
  articleGetController,
  articleDeleteController,
  articleGetAllController,
  articlePatchController,
  articlePutController,
} = require("../controllers/articleController");

router.get("/:id", articleGetController);
router.put("/:id", articlePutController);
router.patch("/:id", articlePatchController);
router.delete("/:id", articleDeleteController);
router.get("/", articleGetAllController);
router.post("/", articlePostController);

module.exports = router;
