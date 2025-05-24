const Article = require("../models/Article");
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

module.exports = {
  createArticle,
  // You can add more functions here for fetching, updating, or deleting articles
};
