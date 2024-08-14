const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var districtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    type: {
      type: Number,
      required: true,
    },
    parent_id: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("District", districtSchema);
