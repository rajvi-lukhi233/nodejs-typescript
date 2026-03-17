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
import jwt from "jsonwebtoken";
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield findUser({ email });
        if (!user) {
            return errorResponse(res, 404, "User is not registered with this email.");
        }
        const comparePass = yield user.comparePassword(password);
        if (!comparePass) {
            return errorResponse(res, 400, "Invalid password.");
        }
        const token = jwt.sign({ userId: user._id, email }, String(process.env.JWT_KEY), { expiresIn: "24h" });
        return successResponse(res, 201, "User login successfully.", {
            email: user.email,
            role: user.role,
            token,
        });
    }
    catch (error) {
        console.log("Register API Error", error);
        return errorResponse(res, 500, "Internal server error");
    }
});
//# sourceMappingURL=login.controller.js.map