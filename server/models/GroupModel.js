const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var groupSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    menu_ids: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Menu",
      },
      ,
    ],
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Group", groupSchema);
