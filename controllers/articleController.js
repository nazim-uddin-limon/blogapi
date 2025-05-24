const { createArticle } = require("../services/articleService");
const articlePostController = async (req, res) => {
  const { title, content, cover, author, status } = req.body;
  if (!title || !content || !author) {
    return res
      .status(400)
      .json({ message: "Title, content, and author are required" });
  }
  try {
    const article = await createArticle({
      title,
      content,
      cover: cover || "",
      author,
      status: status || "draft",
    });
    if (!article) {
      return res.status(500).json({ message: "Error creating article" });
    }
    res.status(201).json({
      code: 201,
      message: "Article Created Successfully",
      data: {
        article,
      },
    });
  } catch (error) {
    throw new Error("Article could not created: " + error.message);
  }
};
module.exports = {
  articlePostController,
};
