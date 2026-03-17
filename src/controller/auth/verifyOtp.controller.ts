import { Request, Response } from "express";
import crypto from "crypto";
import { findUser, updateUserById } from "../../service/user.service.js";
import { errorResponse, successResponse } from "../../util/response.js";

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { otp, email } = req.body;
    const resetPassToken = crypto.randomBytes(32).toString("hex");
    const user = await findUser(
      { email },
      { _id: 1, otpCode: 1, otpExpiredAt: 1 },
    );
    //1. checking is existing user
    if (!user) {
      return errorResponse(res, 404, "This user is not found");
    }
    if (user.otpCode !== otp) {
      return errorResponse(res, 400, "Invalid OTP.");
    }
    //2. checking is OTP is expired or exist
    if (!user.otpExpiredAt || user.otpExpiredAt < new Date()) {
      return errorResponse(
        res,
        400,
        "OTP has expired. Please request a new one",
      );
    }
    //5. update user table
    await updateUserById(user.id, {
      otpCode: null,
      otpExpiredAt: null,
      resetPassToken,
      resetPassTokenExpiredAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    return successResponse(res, 200, "OTP verified successfully.", {
      token: resetPassToken,
    });
  } catch (error) {
    console.log("verifyOTP API Error:", error);
    return errorResponse(res, 500, "Internal server error");
  }
};
