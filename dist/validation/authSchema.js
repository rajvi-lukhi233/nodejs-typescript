import joi from "joi";
import { ROLE } from "../util/constant.js";
export const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().min(6).required(),
    role: joi
        .string()
        .valid(...Object.values(ROLE))
        .default(ROLE.USER),
});
export const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().min(6).required(),
});
export const sendOtpSchema = joi.object({
    email: joi.string().required(),
});
export const verifyOtpSchema = joi.object({
    email: joi.string().required(),
    otp: joi.number().required(),
});
export const forgotPassSchema = joi.object({
    token: joi.string().required(),
    newPassword: joi.string().min(6),
});
//# sourceMappingURL=authSchema.js.map