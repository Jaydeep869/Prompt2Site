const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  userId: String, 
  html: String,
  css: String,
  js: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800
  }
});

module.exports = mongoose.model("Project", projectSchema);
