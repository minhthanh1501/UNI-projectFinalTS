const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  // Bearer token
  // headers: { authorization: Bearer Token}
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err)
        return res.status(401).json({
          success: false,
          mes: "Invalid access Token",
        });

      console.log(decode);
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      mes: "Require authentication!!",
    });
  }
});

const isAdmin = asyncHandler((req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(401).json({
      success: false,
      mes: "Require Admin Role",
    });
  }

  next();
});

module.exports = { verifyAccessToken, isAdmin };
