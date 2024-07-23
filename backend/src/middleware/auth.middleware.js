import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    console.log("token",token);
    console.log("req", req.cookies);

    const decordedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log("decoreded token",decordedToken);

    const user = await User.findById(decordedToken?.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new Error("invalid access token ");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new Error("invalid access token");
  }
});
