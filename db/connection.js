const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blog", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false, // <-- Disables auto index creation
    });
    console.log("Database connected");
  } catch (e) {
    console.log(e);
  }
};

module.exports = connection;
