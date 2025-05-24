const paginate = async (model, options = {}) => {
  const {
    filter = {},
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = -1,
  } = options;

  console.log("filter", filter);

  const skip = (page - 1) * limit;
  console.log(sortBy, sortOrder);
  const [data, total] = await Promise.all([
    model
      .find({ ...filter })
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder }),
    model.countDocuments({ ...filter }),
    model.countDocuments({ ...filter }),
  ]);
  return {
    page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    data,
  };
};

module.exports = paginate;
