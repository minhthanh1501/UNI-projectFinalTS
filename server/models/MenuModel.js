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
    required: true,
  },
  parent_id: {
    type: mongoose.Types.ObjectId,
    ref: "Menu",
    default: null,
  },
  // children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
  permission_ids: [{ type: mongoose.Types.ObjectId, ref: "Permission" }],
});

//Export the model
module.exports = mongoose.model("Menu", menuSchema);
