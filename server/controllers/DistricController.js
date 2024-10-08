const districtModel = require("../models/DistrictModel");
const asyncHandler = require("express-async-handler");

const createOrUpdate = asyncHandler(async (req, res) => {
  const { _id, name, type } = req.body;

  if (!name || !type) throw new Error("Missing Input");

  if (!_id) {
    const response = await districtModel.create(req.body);

    return res.status(200).json({
      status: response ? true : false,
      mes: response ? "Create District success!" : "Something went wrong",
      districtData: response,
    });
  }

  const response = await districtModel.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  return res.status(200).json({
    status: response ? true : false,
    mes: response ? "Update District success!" : "Something went wrong",
    districtData: response,
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

  queries?.parent_id !== "null"
    ? (formatedQueries.parent_id = queries.parent_id)
    : (formatedQueries.parent_id = null);

  let queryCommand = districtModel.find(formatedQueries);

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
    mes: response ? "Get District success" : "Something went wrong",
    districtData: response,
  });
});

const getDetailById = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  console.log(_id);

  const response = await districtModel.findById(_id);

  return res.status(200).json({
    status: response ? true : false,
    mes: response ? "Get District success" : "Something went wrong",
    districtData: response,
  });
});

const deleteById = asyncHandler(async (req, res) => {
  const { _id } = req.query;

  const response = await districtModel.findByIdAndDelete(_id);

  return res.status(200).json({
    status: response ? true : false,
    mes: response ? "Delete District success" : "Something went wrong",
    districtData: null,
  });
});

module.exports = {
  createOrUpdate,
  search,
  getDetailById,
  deleteById,
};
