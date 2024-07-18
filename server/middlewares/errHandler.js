const notFound = (req, res, next) => {
  // tao message error
  const error = new Error(`Route ${req.originalUrl} is not found!`);
  res.status(404);
  //  pass value error to next method in routes
  next(error);
};

// method main handler error
const errHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return res.status(res.statusCode).json({
    success: false,
    mes: error?.message,
  });
};

module.exports = {
  errHandler,
  notFound,
};
