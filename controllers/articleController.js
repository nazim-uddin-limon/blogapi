const {
  createArticle,
  getArticleById,
  getAllArticles,
  getPaginatedArticles,
  deleteArticle,
  updateArticle,
} = require("../services/articleService");
const queryString = require("../lib/queryString");
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
const articleGetController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Article ID is required" });
  }
  try {
    const article = await getArticleById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({
      code: 200,
      message: "Article fetched successfully",
      data: {
        article,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching article: " + error.message });
  }
};
const articlePutController = async (req, res) => {
  const { id } = req.params;
  const { title, content, cover, author, comments, status } = req.body;
  if (!id || !title || !content || !author) {
    return res
      .status(400)
      .json({ message: "ID, title, content, and author are required" });
  }
  const article = await getArticleById(id);
  console.log("Article fetched for update:", article);
  if (!article) {
    try {
      const newArticle = await createArticle({
        title,
        content,
        cover: cover || "",
        author,
        comments: comments || [],
        status: status || "draft",
      });
      res.status(201).json({
        code: 201,
        message: "Article created successfully with put",
        data: {
          article: newArticle,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error creating article with patch" });
    }
  }
  try {
    const updatedArticle = await updateArticle(id, {
      title,
      content,
      cover: cover || "",
      author,
      comments: comments || [],
      status: status || "draft",
    });
    res.status(200).json({
      code: 200,
      message: "Article updated successfully",
      data: {
        article: updatedArticle,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating article: " + error.message });
  }
};
const articlePatchController = async (req, res) => {
  const { id } = req.params;
  const { title, content, cover, author, comments, status } = req.body;
  const article = await getArticleById(id);
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  if (!title && !content && !cover && !author && !comments && !status) {
    return res.status(400).json({ message: "No fields to update" });
  }
  try {
    const updatedArticle = await updateArticle(id, {
      title: title || article.title,
      content: content || article.content,
      cover: cover || article.cover,
      author: author || article.author,
      comments: comments || article.comments,
      status: status || article.status,
    });
    res.status(200).json({
      code: 200,
      message: "Article updated successfully",
      data: {
        article: updatedArticle,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating article: " + error.message });
  }
};
const articleDeleteController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Article ID is required" });
  }
  try {
    await deleteArticle(id);
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting article: " + error.message });
  }
};
const articleGetAllController = async (req, res) => {
  let { page, limit, sort_by, sort, author } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  sort = sort === "asc" ? 1 : -1;
  console.log("Sort order:", sort);

  const filter = {};
  if (author) {
    filter.author = author;
  }

  try {
    console.log("Query parameters:", page, limit, sort_by, sort, author);
    const articles = await getPaginatedArticles(
      page,
      limit,
      filter,
      sort_by || "createdAt",
      sort
    );
    console.log("Articles fetched:", articles);
    res.status(200).json({
      code: 200,
      message: "Articles fetched successfully",
      data: {
        articles: articles.data,
        pagination: {
          page: articles.page,
          totalPages: articles.totalPages,
          totalItems: articles.totalItems,
        },
      },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid query parameters" + error.message });
  }

  res.send();
};
module.exports = {
  articlePostController,
  articleGetController,
  articlePutController,
  articlePatchController,
  articleDeleteController,
  articleGetAllController,
};
