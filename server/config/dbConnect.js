const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn.connection.readyState === 1) {
      console.log("Connect DB Success!");
    } else {
      console.log("DB connecting!");
    }
  } catch (error) {
    console.log("What Wrong happened with DB!");
    throw new Error(error);
  }
};

module.exports = dbConnect;
