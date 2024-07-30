const MenusRecursive = async (parent_id = null, model) => {
  try {
    const result = await model.find({ parent_id: parent_id });

    if (result.length === 0) {
      return [];
    }

    const menus = await Promise.all(
      result.map(async (menu) => {
        const children = await MenusRecursive(menu._id.toString(), model);
        return {
          ...menu.toObject(),
          children: children,
        };
      })
    );

    return menus;
  } catch (error) {
    console.log(error);
    throw error; // re-throw the error after logging it
  }
};

// Hàm đệ quy để lấy tất cả các mã của menu và menu con
function getAllMenuCodes(menu) {
  let codes = [menu.code];
  if (menu.children) {
    menu.children.forEach((child) => {
      codes = codes.concat(getAllMenuCodes(child));
    });
  }
  return codes;
}

module.exports = {
  MenusRecursive,
  getAllMenuCodes,
};
