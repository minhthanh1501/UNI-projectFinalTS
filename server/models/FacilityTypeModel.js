const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var facilityTypeSchema = new mongoose.Schema(
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
    type: {
      type: String,
      required: true,
      enum: ["loai-hinh-san-xuat", "loai-hinh-kinh-doanh"],
    },
    field: {
      type: String,
      required: true,
      enum: ["nong-nghiep", "cong-thuong"],
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("FacilityType", facilityTypeSchema);
