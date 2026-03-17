import { Request, Response } from "express";
import { findUser } from "../../service/user.service.js";
import { errorResponse, successResponse } from "../../util/response.js";
import jwt from "jsonwebtoken";

export const loginUser = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    const user: any = await findUser({ email });
    if (!user) {
      return errorResponse(res, 404, "User is not registered with this email.");
    }
    const comparePass = await user.comparePassword(password);
    if (!comparePass) {
      return errorResponse(res, 400, "Invalid password.");
    }
    const token = jwt.sign(
      { userId: user._id, email },
      String(process.env.JWT_KEY),
      { expiresIn: "24h" },
    );
    return successResponse(res, 201, "User login successfully.", {
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.log("Register API Error", error);
    return errorResponse(res, 500, "Internal server error");
  }
};
