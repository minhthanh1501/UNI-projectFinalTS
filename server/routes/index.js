const userRouter = require("./UserRouter");
const groupRouter = require("./GroupRouter");
const { errHandler, notFound } = require("../middlewares/errHandler");

const initRoutes = (app) => {
  app.use("/api/user/", userRouter);
  app.use("/api/group/", groupRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
