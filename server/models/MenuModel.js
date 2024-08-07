const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var menuSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  url: {
    type: String,
  },
  expression: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  menuType: {
    type: String,
    enum: ["path", "action", "hidden"],
  },
  parent_id: {
    type: mongoose.Types.ObjectId,
    ref: "Menu",
    default: null,
  },
});

//Export the model
module.exports = mongoose.model("Menu", menuSchema);
