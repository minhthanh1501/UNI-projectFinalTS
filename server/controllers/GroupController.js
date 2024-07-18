const GroupModel = require("../models/GroupModel");
const asyncHandler = require("express-async-handler");

const createGroup = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new Error("Missing Input");
  }

  const group = await GroupModel.findOne({ name });

  if (group) {
    throw new Error("Tên nhóm đã tồn tại");
  }

  const response = await GroupModel.create(req.body);

  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Create Group SuccessFully!" : "Cannot Create Group",
  });
});

const updateGroup = asyncHandler(async (req, res) => {
  const gid = req.params;

  if (!gid || Object.keys(req.params).length === 0)
    throw new Error("Missing inputs");

  const response = await GroupModel.findByIdAndUpdate(gid, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: response ? true : false,
    updatedGroup: response ? response : "Cannot update group!",
  });
});

const deleteGroup = asyncHandler(async (req, res) => {
  const gid = req.params;

  const response = await GroupModel.findByIdAndDelete(gid);

  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Delete Successfully!" : "Cannot Delete Group!",
  });
});

const searchByGroupname = asyncHandler(async (req, res) => {});

const getUsersByGroupId = asyncHandler(async (req, res) => {});

const addUserToGroup = asyncHandler(async (req, res) => {});

module.exports = {
  addUserToGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  searchByGroupname,
  getUsersByGroupId,
};
