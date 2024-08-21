const facilityTypeModel = require("../models/FacilityTypeModel");
const asyncHandler = require("express-async-handler");

const createOrUpdate = asyncHandler(async (req, res) => {
  const { _id, code, name, type, field } = req.body;

  if (!name || !type || !code || !field) throw new Error("Missing Input");

  const checkExist = await facilityTypeModel.findOne({ code });

  if (checkExist)
    return res.status(400).json({
      status: true,
      mes: "Mã đã tồn tại",
    });

  if (!_id) {
    const response = await facilityTypeModel.create(req.body);

    return res.status(200).json({
      status: response ? true : false,
      mes: response ? "Create FacilityType success!" : "Something went wrong",
      facilityTypeData: response,
    });
  }

  const response = await facilityTypeModel.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  return res.status(200).json({
    status: response ? true : false,
    mes: response ? "Update FacilityType success!" : "Something went wrong",
    facilityTypeData: response,
  });
});

const search = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  console.log(queries);

  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );

  const formatedQueries = JSON.parse(queryString);

  if (queries?.name)
    formatedQueries.name = { $regex: queries.name, $options: "i" };
  let queryCommand = facilityTypeModel.find(formatedQueries);

  if (queries?.field) formatedQueries.field = queries.field;
  queryCommand = facilityTypeModel.find(formatedQueries);

  // xac định các trường cần lấy
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  // Pagination
  // Limit: so object lay ve 1 lan goi api
  // skip: 2
  //   const page = +req.query.page || 1;
  //   const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  //   const skip = (page - 1) * limit;
  //   queryCommand.skip(skip).limit(limit);

  const response = await queryCommand.exec();
  //   const counts = await professionModel.find(formatedQueries).countDocuments();

  return res.status(200).json({
    status: response ? true : false,
    mes: response ? "Get FacilityType success" : "Something went wrong",
    facilityTypeData: response,
  });
});

const getDetailById = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  console.log(_id);

  const response = await facilityTypeModel.findById(_id);

  return res.status(200).json({
    status: response ? true : false,
    mes: response ? "Get FacilityType success" : "Something went wrong",
    facilityTypeData: response,
  });
});

const deleteById = asyncHandler(async (req, res) => {
  const { _id } = req.query;

  const response = await facilityTypeModel.findByIdAndDelete(_id);

  return res.status(200).json({
    status: response ? true : false,
    mes: response ? "Delete Profession success" : "Something went wrong",
    facilityTypeData: null,
  });
});

module.exports = {
  createOrUpdate,
  search,
  getDetailById,
  deleteById,
};
