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
    unique: true,
    index: true,
  },
  icon: {
    type: String,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  menu_item: [{ type: mongoose.Types.ObjectId, ref: "Menu" }],
});

//Export the model
module.exports = mongoose.model("Menu", menuSchema);
