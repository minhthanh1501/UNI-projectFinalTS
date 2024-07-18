const jwt = require("jsonwebtoken");

const generateAccessToken = (uid, role) =>
  jwt.sign({ _id: uid, role }, process.env.SECRET_KEY, { expiresIn: "1d" });

const generateRefreshToken = (uid) =>
  jwt.sign({ _id: uid }, process.env.SECRET_KEY, { expiresIn: "2d" });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
