var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import crypto from "crypto";
import { findUser, updateUserById } from "../../service/user.service.js";
import { errorResponse, successResponse } from "../../util/response.js";
export const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp, email } = req.body;
        const resetPassToken = crypto.randomBytes(32).toString("hex");
        const user = yield findUser({ email }, { _id: 1, otpCode: 1, otpExpiredAt: 1 });
        //1. checking is existing user
        if (!user) {
            return errorResponse(res, 404, "This user is not found");
        }
        if (user.otpCode !== otp) {
            return errorResponse(res, 400, "Invalid OTP.");
        }
        //2. checking is OTP is expired or exist
        if (!user.otpExpiredAt || user.otpExpiredAt < new Date()) {
            return errorResponse(res, 400, "OTP has expired. Please request a new one");
        }
        //5. update user table
        yield updateUserById(user.id, {
            otpCode: null,
            otpExpiredAt: null,
            resetPassToken,
            resetPassTokenExpiredAt: new Date(Date.now() + 10 * 60 * 1000),
        });
        return successResponse(res, 200, "OTP verified successfully.", {
            token: resetPassToken,
        });
    }
    catch (error) {
        console.log("verifyOTP API Error:", error);
        return errorResponse(res, 500, "Internal server error");
    }
});
//# sourceMappingURL=verifyOtp.controller.js.map