const userRouter = require("./UserRouter");
const groupRouter = require("./GroupRouter");
const menuRouter = require("./MenuRouter");
const professionRouter = require("./ProfessionRouter");
const districtRouter = require("./DistrictRouter");
const facilityTypeRouter = require("./FacilityTypeRouter");

const { errHandler, notFound } = require("../middlewares/errHandler");

const initRoutes = (app) => {
  app.use("/api/user/", userRouter);
  app.use("/api/group/", groupRouter);
  app.use("/api/menu/", menuRouter);
  app.use("/api/profession/", professionRouter);
  app.use("/api/district/", districtRouter);
  app.use("/api/facilityType/", facilityTypeRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
