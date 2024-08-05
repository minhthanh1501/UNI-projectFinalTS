const MenuModel = require("../models/MenuModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { MenusRecursive } = require("../utils/helpers");

const createMenu = asyncHandler(async (req, res) => {
  const { name, expression, order, parent_id = null, ...dataCreate } = req.body;
  const code = slugify(name);
  const orderInteger = parseInt(order);

  if (!name || !expression || !order) {
    throw new Error("Missing Input");
  }

  const data = {
    code,
    name,
    expression,
    order: orderInteger,
    parent_id,
    ...dataCreate,
  };

  const response = await MenuModel.create(data);
  console.log(response);

  if (parent_id && response) {
    const menuChildren = await MenuModel.find({ parent_id }).select("_id");

    const addChildrenToParentMenu = await MenuModel.findByIdAndUpdate(
      { _id: parent_id },
      { $addToSet: { children: { $each: menuChildren } } },
      { new: true }
    );
  }

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

const getMenusChildren = asyncHandler(async (req, res) => {
  const { mid, name } = req.query;

  let searchCriteria = {};
  if (name) {
    searchCriteria.name = { $regex: name, $options: "i" };
  }

  if (!mid) {
    const parent_id = await MenuModel.findOne({ order: 1 });

    const result = await MenuModel.find({
      parent_id: parent_id,
      ...searchCriteria,
    });

    return res.status(200).json({
      success: result ? true : false,
      message: result ? "Get Menus success Children!" : "Something went wrong",
      menuData: result,
    });
  }

  const menus = await MenuModel.find({ parent_id: mid, ...searchCriteria });

  return res.status(200).json({
    success: menus ? true : false,
    message: menus ? "Get Menus Children success!" : "Something went wrong",
    menuData: menus,
  });
});

const deleteMenuById = asyncHandler(async (req, res) => {
  const { _id } = req.query;

  if (!_id) {
    throw new Error("Missing Input");
  }

  const menuChildren = await MenuModel.findByIdAndDelete(_id);

  if (menuChildren) {
    const menuParent = await MenuModel.findByIdAndUpdate(
      { _id: menuChildren.parent_id },
      { $pull: { children: menuChildren._id } },
      { new: true }
    );
  }

  return res.status(200).json({
    success: menuChildren ? true : false,
    message: menuChildren
      ? "Delete Menu By ID success!"
      : "Something went wrong",
    menuData: null,
  });
});

const getMenuById = asyncHandler(async (req, res) => {
  const { _id } = req.query;

  const response = await MenuModel.findById(_id);

  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Get Menu By ID success!" : "Something went wrong",
    menuData: response,
  });
});

const updateMenuById = asyncHandler(async (req, res) => {
  const { _id, name, expression, order, ...createData } = req.body;

  if (!_id || !name || !expression || !order) {
    throw new Error("Missing Input");
  }

  const data = {
    name,
    expression,
    order,
    ...createData,
  };

  const response = await MenuModel.findByIdAndUpdate(_id, data, { new: true });

  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Update Menu By ID success!" : "Something went wrong",
    menuData: response,
  });
});

module.exports = {
  createMenu,
  getMenus,
  getMenusChildren,
  deleteMenuById,
  updateMenuById,
  getMenuById,
};
