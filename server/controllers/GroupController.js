const GroupModel = require("../models/GroupModel");
const MenuModel = require("../models/MenuModel");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");
const { getAllMenuCodes } = require("../utils/helpers");

const createGroup = asyncHandler(async (req, res) => {
  const { code, name } = req.body;

  if (!name || !code) {
    throw new Error("Missing Input");
  }

  const group = await GroupModel.findOne({ name }, { code });

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
    searchCriteria.name = { $regex: name, $options: "i" };
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
    group_id: gid._id.toString(),
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

const checkMenuForGroup = asyncHandler(async (req, res) => {
  const { gid } = req.query;
  console.log(gid);

  const menus = await MenuModel.find();

  const response = await GroupModel.findById(gid);
  console.log(response);

  let matchedMenuCodes = [];

  if (response.menu_ids) {
    response.menu_ids.forEach((menu_id) => {
      menus.forEach((menu) => {
        if (menu._id.toString() === menu_id.toString()) {
          console.log("menu_ids:", menu_id);
          console.log("ID:", menu._id);
          const menuCodes = getAllMenuCodes(menu);
          matchedMenuCodes = [...new Set([...matchedMenuCodes, ...menuCodes])];
        }
      });
    });
  }

  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Get Group Successfully!" : "Something Went Wrong",
    groupData: matchedMenuCodes,
  });
});

const addMenuToGroup = asyncHandler(async (req, res) => {
  const { code, gid } = req.body;

  const menu = await MenuModel.find({ code }).select("_id");
  console.log(menu);

  const response = await GroupModel.findByIdAndUpdate(
    { _id: gid },
    { $set: { menu_ids: menu } },
    { new: true }
  );

  return res.status(200).json({
    success: response ? true : false,
    message: response
      ? "Add Menu To Group Successfully!"
      : "Something Went Wrong",
    groupData: response,
  });
});

const deleteMenuFromGroup = asyncHandler(async (req, res) => {
  const { menu_ids, gid } = req.body;

  const response = await GroupModel.findByIdAndUpdate(
    { _id: gid },
    { $pullAll: { menu_ids: menu_ids } },
    { new: true }
  );

  return res.status(200).json({
    success: response ? true : false,
    message: response
      ? "Add Menu To Group Successfully!"
      : "Something Went Wrong",
    groupData: response,
  });
});

module.exports = {
  createGroup,
  updateGroupById,
  deleteGroupById,
  getGroups,
  getGroupById,
  checkMenuForGroup,
  addMenuToGroup,
  deleteMenuFromGroup,
};
