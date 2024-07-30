const userRouter = require("./UserRouter");
const groupRouter = require("./GroupRouter");
const menuRouter = require("./MenuRouter");
const permissionRouter = require("./PermissionRouter");

const { errHandler, notFound } = require("../middlewares/errHandler");

const initRoutes = (app) => {
  app.use("/api/user/", userRouter);
  app.use("/api/group/", groupRouter);
  app.use("/api/menu/", menuRouter);
  app.use("/api/permission/", permissionRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
