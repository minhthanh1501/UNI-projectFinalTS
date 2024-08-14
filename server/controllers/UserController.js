const asyncHandler = require("express-async-handler");
const userModel = require("../models/UserModel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const UserModel = require("../models/UserModel");
const { model } = require("mongoose");
const { buildMenuTree } = require("../utils/helpers");

const getUsers = asyncHandler(async (req, res) => {
  const { email, fullname, gid } = req.query;

  const searchCriteria = {};
  if (fullname) {
    searchCriteria.fullname = { $regex: fullname, $options: "i" };
  }
  if (email) {
    searchCriteria.email = { $regex: email, $options: "i" };
  }
  if (gid) {
    const groupIdsArray = Array.isArray(gid) ? gid : [gid];
    searchCriteria.group_id = { $in: groupIdsArray };
  }

  let query = userModel.find(searchCriteria).populate("group_id", "_id");

  const users = await query;

  return res.status(200).json({
    success: users ? true : false,
    message: users ? "Get Users SuccessFully!" : "Something went Wrong!",
    userData: users,
  });
  // const delay = 3000; // Độ trễ 3 giây

  // setTimeout(() => {
  //   res.send("This response was delayed by 3 seconds.");
  // }, delay);
});

const getUserById = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id) {
    throw new Error("Missing Input");
  }
  const user = await userModel.findById(_id);

  return res.status(200).json({
    success: user ? true : false,
    message: user ? "Get User Success!" : "Something went wrong",
    userData: user,
  });
});

const updateUserById = asyncHandler(async (req, res) => {
  const { _id, fullname, email } = req.body;
  if (!fullname || !email) {
    throw new Error("Missing Input");
  }

  const updateUser = await userModel
    .findByIdAndUpdate(_id, req.body, {
      new: true,
    })
    .select("-password -refreshToken -role");

  return res.status(200).json({
    success: updateUser ? true : false,
    message: updateUser ? "Update User Success!" : "Something went wrong",
    userData: updateUser,
  });
});

const deleteUserById = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id) {
    throw new Error("Missing Input");
  }
  const user = await userModel.findByIdAndDelete(_id);

  return res.status(200).json({
    success: user ? true : false,
    message: user ? "Delete User Success!" : "Something went wrong",
  });
});

const addUserToGroup = asyncHandler(async (req, res) => {
  const { uid, gid } = req.body;

  if (Array.isArray(uid)) {
    uid.forEach(async (element) => {
      const response = await UserModel.findByIdAndUpdate(
        { _id: element },
        { $push: { group_id: gid } },
        { new: true }
      );
    });

    return res.status(200).json({
      status: true,
      message: "Add Users in Group success!",
      userData: null,
    });
  }

  const response = await UserModel.findByIdAndUpdate(
    { _id: uid },
    { $push: { group_id: gid } },
    { new: true }
  );

  return res.status(200).json({
    status: response ? true : false,
    message: response ? "Add Users in Group success!" : "Something went wrong",
    userData: null,
  });
});

const deleteUserFromGroup = asyncHandler(async (req, res) => {
  const { gid, uid } = req.body;

  if (Array.isArray(uid)) {
    uid.forEach(async (element) => {
      const response = await userModel.findByIdAndUpdate(
        { _id: element },
        { $pull: { group_id: gid } },
        { new: true }
      );
    });

    return res.status(200).json({
      status: response ? true : false,
      message: response
        ? "Delete Users in Group success!"
        : "Something went wrong",
      groupData: null,
    });
  }

  const response = await userModel.findByIdAndUpdate(
    { _id: uid },
    { $pull: { group_id: gid } },
    { new: true }
  );

  return res.status(200).json({
    status: response ? true : false,
    message: response
      ? "Delete Users in Group success!"
      : "Something went wrong",
    groupData: null,
  });
});

const register = asyncHandler(async (req, res) => {
  const { username, password, fullname, email } = req.body;

  if (!username || !password || !fullname || !email) {
    throw new Error("Missing Input");
  }

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (user) {
    throw new Error("Tên đăng nhập hoặc Email đã tồn tại");
  }

  const newUser = await userModel.create(req.body);

  return res.status(200).json({
    success: newUser ? true : false,
    message: newUser ? "Register User SuccessFully!" : "Something went Wrong!",
    userData: newUser,
  });
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new Error("Missing Input");
  }

  const user = await userModel.findOne({ username }).populate({
    path: "group_id",
    populate: {
      path: "menu_ids",
    },
  });

  if (user && (await user.isCorrectPassword(password))) {
    const { password, role, refreshToken, ...userData } = user.toObject();

    const accessToken = generateAccessToken(user._id, role);
    const newRefreshToken = generateRefreshToken(user._id);

    await UserModel.findByIdAndUpdate(
      user._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "login Successfully!",
      accessToken,
      userData,
    });
  } else {
    throw new Error(`Invalid credentials!`);
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const user = await userModel
    .findById(_id)
    .select("-password -role -refreshToken")
    .populate({
      path: "group_id",
      select: "code name",
      populate: {
        path: "menu_ids",
      },
    });

  const userObject = user.toObject();
  if (userObject.group_id != null) {
    const listMenu = userObject.group_id.menu_ids;
    const filteredMenu = listMenu.filter((menu) => menu.menuType == "path");
    console.log("filteredMenu", filteredMenu);
    const menuTree = buildMenuTree(filteredMenu);
    console.log("menuTree:", menuTree);
    userObject.listMenu = menuTree;
  } else {
    userObject.listMenu = [];
  }

  console.log("userObject: ", userObject);

  return res.status(200).json({
    success: userObject ? true : false,
    message: userObject ? "Get User Current success!" : "Something Went Wrong",
    userData: userObject,
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // get Token from cookies
  const cookie = req.cookies;
  // check token exist
  if (!cookie && !cookie.refreshToken) {
    throw new Error("No refresh token in cookies");
  }

  // check token co hop le khong
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    succes: response ? true : false,
    newAccessToken: response
      ? generateAccessToken({ _id: response._id, role: response.role })
      : "Refresh token not matched",
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { oldpassword, newpassword: password } = req.body;

  if (!oldpassword || !password) {
    throw new Error("Missing Input");
  }

  if (oldpassword === password) {
    throw new Error("Password same");
  }

  const user = await userModel.findById(_id);
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await user.isCorrectPassword(oldpassword);
  if (!isMatch) {
    throw new Error("Old password is incorrect");
  }

  user.password = password;
  const response = await user.save(); // Mã hóa mật khẩu sẽ được thực hiện ở đây bởi pre-save hook

  return res.status(200).json({
    status: response ? true : false,
    message: response ? "ChangePassword success!" : "Something went wrong",
    userData: response,
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh Token in cookie");
  // xoa column refreshToken trong db
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  // xoa refreshToken o cookie trinh duyet
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({
    success: true,
    mes: "Logout Success!",
  });
});

module.exports = {
  register,
  login,
  getCurrentUser,
  refreshAccessToken,
  logout,
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  addUserToGroup,
  deleteUserFromGroup,
  changePassword,
};
