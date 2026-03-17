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
export const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { newPassword, token } = req.body;
        const user = yield findUser({
            resetPassToken: token,
        });
        if (!user) {
            return errorResponse(res, 400, "Invalid Reset password token");
        }
        if (!user.resetPassTokenExpiredAt ||
            user.resetPassTokenExpiredAt < new Date()) {
            return errorResponse(res, 400, "Reset password token has expired.");
        }
        user.resetPassToken = null;
        user.resetPassTokenExpiredAt = null;
        user.password = newPassword;
        user.save();
        return successResponse(res, 200, "Password reset successfully.");
    }
    catch (error) {
        console.log("Forgot password API Error", error);
        return errorResponse(res, 500, "Internal server error");
    }
});
//# sourceMappingURL=forgotPassword.controller.js.map