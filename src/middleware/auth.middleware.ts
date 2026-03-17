import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../util/response.js";
import jwt from "jsonwebtoken";
import { findUser } from "../service/user.service.js";
import { AuthRequest, IJwtPayload } from "../interface/auth.interface.js";

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return errorResponse(
      res,
      400,
      "Access denied. No authorization token provided",
    );
  }
  try {
    let decoded = jwt.verify(token, String(process.env.JWT_KEY)) as IJwtPayload;
    const existUser = await findUser(
      { _id: decoded.userId, deletedAt: null },
      { _id: 1 },
    );
    if (!existUser) {
      return errorResponse(res, 404, "This user is not found.");
    }
    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return errorResponse(res, 401, "Token expired.");
    }
    console.log("Internal server error", error);
    return errorResponse(res, 500, "Invalid token.");
  }
};
