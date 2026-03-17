var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { errorResponse } from "../util/response.js";
import jwt from "jsonwebtoken";
import { findUser } from "../service/user.service.js";
export const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return errorResponse(res, 400, "Access denied. No authorization token provided");
    }
    try {
        let decoded = jwt.verify(token, String(process.env.JWT_KEY));
        const existUser = yield findUser({ _id: decoded.userId, deletedAt: null }, { _id: 1 });
        if (!existUser) {
            return errorResponse(res, 404, "This user is not found.");
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return errorResponse(res, 401, "Token expired.");
        }
        console.log("Internal server error", error);
        return errorResponse(res, 500, "Invalid token.");
    }
});
//# sourceMappingURL=auth.middleware.js.map