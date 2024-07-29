const MenuModel = require("../models/MenuModel");
const asyncHandler = require("express-async-handler");

const createMenu = asyncHandler(async (req, res) => {
  const { code, name, icon, url, parent_id } = req.body;

  if (!name || !code || !url) {
    throw new Error("Missing Input");
  }

  const response = await MenuModel.create(req.body);

  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Create Menu success!" : "Something went wrong",
    MenuData: response,
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

module.export = {
  createMenu,
};
