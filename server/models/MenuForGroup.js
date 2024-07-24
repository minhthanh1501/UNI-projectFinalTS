const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var menuForGroupSchema = new mongoose.Schema({
  group_id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  menu_item: [{ type: mongoose.Types.ObjectId, ref: "Menu" }],
});

//Export the model
module.exports = mongoose.model("menu_for_group", menuForGroupSchema);
