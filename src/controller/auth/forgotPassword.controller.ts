import { Request, Response } from "express";
import { findUser } from "../../service/user.service.js";
import { errorResponse, successResponse } from "../../util/response.js";

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword, token } = req.body;
    const user= await findUser({
      resetPassToken: token,
    });
    if (!user) {
      return errorResponse(res, 400, "Invalid Reset password token");
    }
    if (
      !user.resetPassTokenExpiredAt ||
      user.resetPassTokenExpiredAt < new Date()
    ) {
      return errorResponse(res, 400, "Reset password token has expired.");
    }
    user.resetPassToken = null;
    user.resetPassTokenExpiredAt = null;
    user.password = newPassword;
    user.save();

    return successResponse(res, 200, "Password reset successfully.");
  } catch (error) {
    console.log("Forgot password API Error", error);
    return errorResponse(res, 500, "Internal server error");
  }
};
