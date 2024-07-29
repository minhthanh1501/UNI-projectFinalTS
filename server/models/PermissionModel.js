const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var permissionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  parent_id: {
    type: String,
    default: 0,
  },
});

//Export the model
module.exports = mongoose.model("Permission", permissionSchema);
