// Hàm đệ quy để lấy tất cả các mã của menu và menu con
function getAllMenuCodes(menu) {
  let codes = [menu.code].filter((code) => code !== undefined);
  if (menu.children) {
    menu.children.forEach((child) => {
      codes = codes.concat(getAllMenuCodes(child));
    });
  }
  return codes;
}

const MenusRecursive = async (parent_id = null, model) => {
  try {
    // Tìm các menu có parent_id tương ứng
    const menuParent = await model.find({ parent_id: parent_id });

    // Nếu không tìm thấy menu nào, trả về mảng rỗng
    if (menuParent.length === 0) {
      return [];
    }

    // Danh sách chứa các menu và các menu con của chúng
    const menus = [];
    for (const menu of menuParent) {
      // Gọi đệ quy để tìm các menu con của menu hiện tại
      const childMenus = await MenusRecursive(menu._id.toString(), model);
      menus.push({
        ...menu.toObject(), // Chuyển đổi đối tượng Mongoose sang đối tượng JS thuần
        children: childMenus, // Thêm các menu con vào thuộc tính children
      });
    }

    return menus;
  } catch (error) {
    console.error(error); // Log lỗi nếu có
    throw error; // Ném lỗi lên trên sau khi log
  }
};

const buildMenuTree = (menus) => {
  const menuMap = {};

  // Thêm thuộc tính children vào mỗi menu và lưu vào đối tượng
  menus.forEach((menu) => {
    menu.children = []; // Thêm thuộc tính children cho các menu
    menuMap[menu._id.toString()] = menu; // Chuyển ObjectId thành chuỗi để dễ tra cứu
  });
  // console.log("MenuMap:", menuMap);

  // Tạo cây từ đối tượng menuMap
  const tree = [];

  const addedToTree = new Set(); // Tập hợp các menu đã được thêm vào tree

  // Chỉ trả về các menu không có parent_id là null và các con của chúng
  menus.forEach((menu) => {
    if (menu.parent_id !== null) {
      const parent = menuMap[menu.parent_id.toString()];
      if (parent && !addedToTree.has(menu._id.toString())) {
        parent.children.push(menu);
        addedToTree.add(menu._id.toString());
      }
    } else {
      tree.push(menu);
      addedToTree.add(menu._id.toString());
    }
  });

  // Lọc các phần tử có parent_id là null ra khỏi tree và chỉ giữ các con của chúng
  const finalTree = [];
  tree.forEach((menu) => {
    if (menu.children.length > 0) {
      menu.children.forEach((child) => {
        finalTree.push(child);
      });
    }
  });

  return finalTree;
};

module.exports = {
  MenusRecursive,
  getAllMenuCodes,
  buildMenuTree,
};
