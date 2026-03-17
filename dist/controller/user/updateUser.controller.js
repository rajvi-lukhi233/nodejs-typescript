var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { findUser, updateUserById } from "../../service/user.service.js";
import { errorResponse, successResponse } from "../../util/response.js";
import { isValidObjectId } from "../../util/validObjectId.js";
export const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { name, email } = req.body;
        if (!isValidObjectId(userId)) {
            return errorResponse(res, 400, "userId is required or invalid.");
        }
        if (email) {
            const existUser = yield findUser({ email });
            if (existUser) {
                return errorResponse(res, 400, "This email is already registered please use other email.");
            }
        }
        const updatedUser = yield updateUserById(userId, { name, email });
        if (updatedUser) {
            return successResponse(res, 200, "User profile updated successfully.", updatedUser);
        }
        return errorResponse(res, 400, "User profile not updated.");
    }
    catch (error) {
        console.log("UpdateUserProfile API Error:", error);
        return errorResponse(res, 500, "Internal server error.");
    }
});
//# sourceMappingURL=updateUser.controller.js.map