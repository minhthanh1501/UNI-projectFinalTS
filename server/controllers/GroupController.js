const GroupModel = require("../models/GroupModel");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");

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
  const { name } = req.query;

  const searchCriteria = {};

  if (name) {
    searchCriteria.name = new RegExp(name, "i");
  }

  let query = GroupModel.find(searchCriteria);

  const response = await query;

  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Get Groups success!" : "Something went wrong",
    groupData: response,
  });
});

const getGroupById = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  const response = await GroupModel.findById(_id);

  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Get Group success!" : "Something went wrong",
    groupData: response,
  });
});

const updateGroupById = asyncHandler(async (req, res) => {
  const { _id, name } = req.body;

  if (!name) throw new Error("Missing inputs");

  const response = await GroupModel.findByIdAndUpdate(_id, req.body, {
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
  const users = await UserModel.find({
    group_id: { $in: gid._id.toString() },
  }).select("group_id");

  users.forEach(async (element) => {
    await UserModel.findByIdAndUpdate(
      { _id: element._id },
      { $pull: { group_id: gid._id.toString() } }
    );
  });

  const response = await GroupModel.findByIdAndDelete(gid);

  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Delete Group Successfully!" : "Cannot Delete Group!",
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

module.exports = {
  createGroup,
  updateGroupById,
  deleteGroupById,
  searchByGroupname,
  getGroups,
  getGroupById,
};
