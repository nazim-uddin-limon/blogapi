const Article = require("../models/Article");
const paginate = require("../lib/pagination");
const createArticle = async ({
  title,
  content,
  cover = "",
  author,
  comments = [],
  status = "draft",
}) => {
  const article = new Article({
    title,
    content,
    cover,
    author,
    comments,
    status,
  });
  await article.save();
  return article;
};
const getArticleById = async (id) => {
  try {
    const article = await Article.findById(id).populate(
      "author",
      "name email avatar"
    );
    if (!article) {
      return null;
    }
    return article;
  } catch (error) {
    throw new Error("Error fetching article: " + error.message);
  }
};

const getAllArticles = async () => {
  const articles = await Article.find();
  return articles;
};
const getPaginatedArticles = async (
  page = 1,
  limit = 10,
  filter = {},
  sortBy = "createdAt",
  sortOrder = -1
) => {
  try {
    const paginationResult = await paginate(Article, {
      filter,
      page,
      limit,
      sortBy,
      sortOrder,
    });
    return paginationResult;
  } catch (error) {
    throw new Error("Error fetching paginated articles: " + error.message);
  }
};
const updateArticle = async (id, updateData) => {
  try {
    const article = await Article.findById(id);
    if (!article) {
      throw new Error("Article not found");
    }
    const { title, content, cover, author, comments, status } = updateData;
    article.title = title || article.title;
    article.content = content || article.content;
    article.cover = cover || article.cover;
    article.author = author || article.author;
    article.comments = comments || article.comments;
    article.status = status || article.status;

    await article.save();
    return article;
  } catch (error) {
    throw new Error("Error updating article: " + error.message);
  }
};
const deleteArticle = async (id) => {
  try {
    const article = await Article.findById(id);
    if (!article) {
      throw new Error("Article not found");
    }
    await article.deleteOne();
    return { message: "Article deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting article: " + error.message);
  }
};
module.exports = {
  createArticle,
  getArticleById,
  getAllArticles,
  getPaginatedArticles,
  deleteArticle,
  updateArticle,
  // You can add more functions here for fetching, updating, or deleting articles
};
