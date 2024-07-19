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
    message: response ? "Create group success!" : "Something went wrong",
    groupData: response,
  });
});

const getGroups = asyncHandler(async (req, res) => {
  const response = await GroupModel.find();

  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Get Groups success!" : "Something went wrong",
    groupData: response,
  });
});

const getGroupById = asyncHandler(async (req, res) => {
  const { _id } = req.query;

  const response = await GroupModel.findById(_id);

  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Get Group success!" : "Something went wrong",
    groupData: response,
  });
});

const updateGroupById = asyncHandler(async (req, res) => {
  const gid = req.params;

  if (!gid || Object.keys(req.params).length === 0)
    throw new Error("Missing inputs");

  const response = await GroupModel.findByIdAndUpdate(gid, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Update group success!" : "Something went wrong",
    groupData: response,
  });
});

const deleteGroupById = asyncHandler(async (req, res) => {
  const gid = req.params;

  const response = await GroupModel.findByIdAndDelete(gid);

  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Delete Successfully!" : "Cannot Delete Group!",
  });
});

const searchByGroupname = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new Error("Missing Input");
  }

  const searchGroup = GroupModel.find({
    name: new RegExp(username, "i"),
  });

  return res.status(200).json({
    status: searchGroup ? true : false,
    message: searchGroup ? "Search group success!" : "Something went wrong",
    groupData: searchGroup,
  });
});

const getUsersByGroupId = asyncHandler(async (req, res) => {
  const { _id } = req.query;

  const users = await GroupModel.findById(_id).populate("users");

  return res.status(200).json({
    status: users ? true : false,
    message: users ? "Get Users in Group success!" : "Something went wrong",
    groupData: users,
  });
});

const addUserToGroup = asyncHandler(async (req, res) => {
  const { userId, groupId } = req.body;

  const response = await GroupModel.findByIdAndUpdate(
    groupId,
    { $addToSet: { users: userId } },
    { new: true }
  );

  return res.status(200).json({
    status: response ? true : false,
    message: response ? "Add Users in Group success!" : "Something went wrong",
    groupData: response,
  });
});

const deleteUserFromGroup = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { groupId } = req.query;

  const response = await GroupModel.findByIdAndUpdate(
    groupId,
    { $pull: { users: userId } },
    { new: true }
  );

  return res.status(200).json({
    status: response ? true : false,
    message: response ? "Add Users in Group success!" : "Something went wrong",
    groupData: response,
  });
});

module.exports = {
  addUserToGroup,
  createGroup,
  updateGroupById,
  deleteGroupById,
  searchByGroupname,
  getUsersByGroupId,
  deleteUserFromGroup,
  getGroups,
  getGroupById,
};
