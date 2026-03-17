import { Request, Response } from "express";
import { findUser, updateUserById } from "../../service/user.service.js";
import { errorResponse, successResponse } from "../../util/response.js";
export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await findUser({ email }, { _id: 1 });
    const otp = Math.floor(100000 + Math.random() * 900000);
    //1. checking is existing user
    if (!user) {
      return errorResponse(res, 404, "This user is not found");
    }

    user.otpCode = otp;
    user.otpExpiredAt = new Date(Date.now() + 10 * 60 * 1000);
    user.save();

    return successResponse(
      res,
      200,
      "OTP has been sent to your email address successfully.",
      {
        otp,
      },
    );
  } catch (error) {
    console.log("SendOTP API Error:", error);
    return errorResponse(res, 500, "Internal server error");
  }
};
