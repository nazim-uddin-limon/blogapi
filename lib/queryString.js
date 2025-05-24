const queryString = (query) => {
  const params = new URLSearchParams();

  if (query.page) {
    params.append("page", query.page);
  }
  if (query.limit) {
    params.append("limit", query.limit);
  }
  if (query.sort_by) {
    params.append("sort_by", query.sort_by);
  }
  if (query.sort) {
    params.append("sort", query.sort);
  }
  if (query.author) {
    params.append("author", query.author);
  }

  return params.toString();
};

module.exports = queryString;
