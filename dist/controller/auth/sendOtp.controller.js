var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { findUser } from "../../service/user.service.js";
import { errorResponse, successResponse } from "../../util/response.js";
export const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield findUser({ email }, { _id: 1 });
        const otp = Math.floor(100000 + Math.random() * 900000);
        //1. checking is existing user
        if (!user) {
            return errorResponse(res, 404, "This user is not found");
        }
        user.otpCode = otp;
        user.otpExpiredAt = new Date(Date.now() + 10 * 60 * 1000);
        user.save();
        return successResponse(res, 200, "OTP has been sent to your email address successfully.", {
            otp,
        });
    }
    catch (error) {
        console.log("SendOTP API Error:", error);
        return errorResponse(res, 500, "Internal server error");
    }
});
//# sourceMappingURL=sendOtp.controller.js.map