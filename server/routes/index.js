const userRouter = require("./UserRouter");
const { errHandler, notFound } = require("../middlewares/errHandler");

const initRoutes = (app) => {
  app.use("/api/user/", userRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
