const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var foodSafetySchema = new mongoose.Schema(
  {
    business_registration_number: {
      type: String,
    },
    license_issuance_date: {
      type: String,
    },
    facility_owner_name: {
      type: String,
      required: true,
    },
    personal_identity_number: {
      type: String,
      required: true,
      unique: true,
    },
    facility_name: {
      type: String,
      required: true,
      unique: true,
    },
    facility_manager_name: {
      type: String,
    },
    district_id: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "District",
      },
    ],
    regular_address: {
      type: String,
    },
    base_address: {
      type: String,
      required: true,
    },
    facility_type_id: {
      type: mongoose.Types.ObjectId,
      ref: "FacilityType",
    },
    profession_id: {
      type: mongoose.Types.ObjectId,
      ref: "Profession",
    },
    range: {
      type: String,
    },
    phone: {
      type: String,
    },
    number_of_direct_workers: {
      type: String,
    },
    number_of_indirect_workers: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("FoodSafety", foodSafetySchema);
