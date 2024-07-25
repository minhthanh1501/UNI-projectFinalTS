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
    // user_id: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "User",
    //   },
    //   ,
    // ],
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Group", groupSchema);
