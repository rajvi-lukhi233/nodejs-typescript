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
export const deleteUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        if (!isValidObjectId(userId)) {
            return errorResponse(res, 400, "userId is required or invalid.");
        }
        const user = yield findUser({ _id: userId }, { id: 1 });
        if (!user) {
            return errorResponse(res, 404, "This user is not found");
        }
        yield updateUserById(userId, { deletedAt: new Date() });
        return successResponse(res, 200, "User deleted successfully.");
    }
    catch (error) {
        console.log("DeleteUserProfile API Error:", error);
        return successResponse(res, 500, "Internal server error");
    }
});
//# sourceMappingURL=deleteUser.controller.js.map