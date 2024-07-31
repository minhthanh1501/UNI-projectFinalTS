const PermissionModel = require("../models/PermissionModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createPermission = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const code = slugify(name);

  if (!name) {
    throw new Error("Missing Input");
  }

  const data = {
    name,
    code,
    parent_id,
  };

  const response = await PermissionModel.create(data);

  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Create group success!" : "Something went wrong",
    groupData: response,
  });
});

module.exports = {
  createPermission,
};
