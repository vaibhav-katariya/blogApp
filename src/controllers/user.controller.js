import { Error } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.genrateAccessToken();
    const refreshToken = user.genrateRefreshToken();

    // assign refreshToken

    user.refreshToken = refreshToken;

    // save refresh token in database
    await user.save({ validateBeforSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(
      "somethin went wrong while generating refresh token and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // console.log(req.body);

  if (!(username || email || password)) {
    throw new Error("Username, email, and password are required.");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new Error("user already exists");
  }
  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id)?.select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new Error("error while creating the user");
  }

  res.status(201).json({
    message: "user created successfully",
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!(email || password)) {
    throw new Error("email and password are required");
  }
  const user = await User.findOne({
    $or: [{ email }, { password }],
  });
  if (!user) {
    throw new Error("user not found");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new Error("password is incorrect");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json({
      message: "user logged in successfully",
      loggedInUser,
      accessToken,
      refreshToken,
    });
});

const logoutUser = asyncHandler(async (req, res) => {
  // const {refreshToken} = req.cookies;
  // if(!refreshToken){
  //   throw new Error("refresh token is required");
  // }
  // const user = await User.findOne({refreshToken});
  // if(!user){
  //   throw new Error("user not found");
  // }
  // await User.findByIdAndUpdate(user._id,{refreshToken:""});
  // res.status(200).clearCookie("accessToken").clearCookie("refreshToken").json({
  //   message:"user logged out successfully"
  // })

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: "" },
    },
    { new: true }
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json({
      message: "user logged out successfully",
    });
});

const genRefreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;
  if (!incomingRefreshToken) {
    throw new Error("refresh token is required");
  }
  const decordedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const user = await User.findById(decordedToken.id);
  if (!user) {
    throw new Error("user not found");
  }

  if (incomingRefreshToken !== req.cookies?.refreshToken) {
    throw new Error("refresh token is not matched");
  }

  const { refreshToken, accessToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const option = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json({
      message: "refresh token is generated successfully",
      accessToken,
      refreshToken,
    });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new Error("user not found");
  }
  res.status(200).json({
    message: "user found",
    user,
  });
});

const updateCurrentPasswrod = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new Error("user not found");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new Error("old password is incorrect");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    message: "password updated successfully",
  });
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new Error("user not found");
  }

  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        username,
        email,
      },
    },
    { new: true }
  ).select("-password");

  res.status(200).json({
    message: "user details updated successfully",
    user,
  });
});


export {
  registerUser,
  loginUser,
  logoutUser,
  genRefreshToken,
  getCurrentUser,
  updateCurrentPasswrod,
  updateUserDetails,
};
