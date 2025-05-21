const notFoundError = (_req, _res, next) => {
  const error = new Error("Resource not found");
  error.status = 404;
  next(error);
};

const serverError = (error, req, res, next) => {
  const message = error.message || "Something went wrong";
  const code = error.status || 500;

  res.status(code).json({ code, message });
};

module.exports = {
  notFoundError,
  serverError,
};
