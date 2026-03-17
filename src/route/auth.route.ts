import express from "express";
import { registerUser } from "../controller/auth/register.controller.js";
import { schemaValidation } from "../middleware/validation.middleware.js";
import {
  forgotPassSchema,
  loginSchema,
  registerSchema,
  sendOtpSchema,
  verifyOtpSchema,
} from "../validation/authSchema.js";
import { loginUser } from "../controller/auth/login.controller.js";
import { sendOtp } from "../controller/auth/sendOtp.controller.js";
import { verifyOtp } from "../controller/auth/verifyOtp.controller.js";
import { forgotPassword } from "../controller/auth/forgotPassword.controller.js";
const route = express.Router();

route.post("/register", schemaValidation(registerSchema), registerUser);
route.post("/login", schemaValidation(loginSchema), loginUser);
route.post("/sendOtp", schemaValidation(sendOtpSchema), sendOtp);
route.post("/verifyOtp", schemaValidation(verifyOtpSchema), verifyOtp);
route.post("/forgotPass", schemaValidation(forgotPassSchema), forgotPassword);

export default route;
