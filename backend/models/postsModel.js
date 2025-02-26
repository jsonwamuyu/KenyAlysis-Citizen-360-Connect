const mongoose = require("mongoose");

const postModel = mongoose.Schema(
  {
    title: {
      typeof: String,
      required: [true, "Title is required."],
      trim: true,
    },
    description: {
      typeof: String,
      required: [true, "Description is required."],
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Post", postModel);
