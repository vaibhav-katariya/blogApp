import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = await req.cookies?.accessToken;

    console.log("token", token);
    console.log("req", req.cookies);

    if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    const decordedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

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
