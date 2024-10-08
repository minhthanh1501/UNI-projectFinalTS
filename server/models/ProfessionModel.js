const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var professionSchema = new mongoose.Schema(
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
    field: {
      type: String,
      required: true,
      enum: ["nong-nghiep", "cong-thuong"],
    },
    parent_id: {
      type: mongoose.Types.ObjectId,
      ref: "FacilityType",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Profession", professionSchema);
