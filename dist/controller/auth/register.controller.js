var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createUser, findUser } from "../../service/user.service.js";
import { errorResponse, successResponse } from "../../util/response.js";
import jwt from "jsonwebtoken";
export const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        const existUser = yield findUser({ email }, { _id: 1 });
        if (existUser) {
            return errorResponse(res, 400, "User is already exist with this email.");
        }
        let user = yield createUser({ name, email, password, role });
        const token = jwt.sign({ userId: user._id, email }, String(process.env.JWT_KEY), { expiresIn: "24h" });
        return successResponse(res, 201, "User registered successfully.", {
            user,
            token,
        });
    }
    catch (error) {
        console.log("Register API Error", error);
        return errorResponse(res, 500, "Internal server error");
    }
});
//# sourceMappingURL=register.controller.js.map