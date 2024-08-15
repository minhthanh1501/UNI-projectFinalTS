const foodSafetyModel = require("../models/FoodSafetyModel");
const asyncHandler = require("express-async-handler");

const createOrUpdate = asyncHandler(async (req, res) => {
  const {
    _id,
    facility_owner_name,
    facility_name,
    district_id,
    base_address,
    facility_type_id,
    profession_id,
    personal_identity_number,
  } = req.body;

  if (
    !facility_owner_name ||
    !facility_name ||
    !district_id ||
    !base_address ||
    !facility_type_id ||
    !profession_id ||
    !personal_identity_number
  )
    throw new Error("Missing Input");

  if (!_id) {
    const response = await foodSafetyModel.create(req.body);

    return res.status(200).json({
      status: response ? true : false,
      mes: response ? "Create FoodSafety success!" : "Something went wrong",
      foodSafetyData: response,
    });
  }

  const response = await foodSafetyModel.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  return res.status(200).json({
    status: response ? true : false,
    mes: response ? "Update FoodSafety success!" : "Something went wrong",
    foodSafetyData: response,
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

  // Danh sách các field mà bạn muốn tìm kiếm với regex
  const searchFields = [
    "facility_name",
    "facility_owner_name",
    "phone",
    "personal_identity_number",
    "business_registration_number",
  ];

  searchFields.forEach((field) => {
    if (queries[field]) {
      formatedQueries[field] = { $regex: queries[field], $options: "i" };
    }
  });

  if (queries.district_id) queryCommand.district_id = queries.district_id;
  if (queries.profession_id) queryCommand.profession_id = queries.profession_id;

  let queryCommand = foodSafetyModel
    .find(formatedQueries)
    .populate("district_id")
    .populate("profession_id")
    .populate("facility_type_id");

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
    mes: response ? "Get FoodSafety success" : "Something went wrong",
    foodSafetyData: response,
  });
});

const getDetailById = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  console.log(_id);

  const response = await foodSafetyModel.findById(_id);

  return res.status(200).json({
    status: response ? true : false,
    mes: response ? "Get FoodSafety success" : "Something went wrong",
    foodSafetyData: response,
  });
});

const deleteById = asyncHandler(async (req, res) => {
  const { _id } = req.query;

  const response = await foodSafetyModel.findByIdAndDelete(_id);

  return res.status(200).json({
    status: response ? true : false,
    mes: response ? "Delete FoodSafety success" : "Something went wrong",
    foodSafetyData: null,
  });
});

module.exports = {
  createOrUpdate,
  search,
  getDetailById,
  deleteById,
};
