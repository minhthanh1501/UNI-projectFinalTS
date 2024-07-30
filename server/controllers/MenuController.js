const MenuModel = require("../models/MenuModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { MenusRecursive } = require("../utils/helpers");

const createMenu = asyncHandler(async (req, res) => {
  const { name, icon, url, parent_id } = req.body;
  const code = slugify(name);

  if (!name || !url) {
    throw new Error("Missing Input");
  }

  const data = { code, name, icon, url, parent_id: parent_id || null };

  const response = await MenuModel.create(data);

  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Create Menu success!" : "Something went wrong",
    menuData: response,
  });
});

const getMenus = asyncHandler(async (req, res) => {
  const result = await MenusRecursive(null, MenuModel);

  return res.status(200).json({
    success: result ? true : false,
    message: result ? "Get Menus success!" : "Something went wrong",
    menuData: result,
  });
});

const addMenuToGroup = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: result ? true : false,
    message: result ? "Get Menus success!" : "Something went wrong",
    menuData: result,
  });
});

module.exports = {
  createMenu,
  getMenus,
  addMenuToGroup,
};
