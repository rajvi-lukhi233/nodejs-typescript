import { Request, Response } from "express";
import { createUser, findUser } from "../../service/user.service.js";
import { errorResponse, successResponse } from "../../util/response.js";
import jwt from "jsonwebtoken";

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { name, email, password, role } = req.body;
    const existUser = await findUser({ email }, { _id: 1 });
    if (existUser) {
      return errorResponse(res, 400, "User is already exist with this email.");
    }
    let user = await createUser({ name, email, password, role });
    const token = jwt.sign(
      { userId: user._id, email },
      String(process.env.JWT_KEY),
      { expiresIn: "24h" },
    );
    return successResponse(res, 201, "User registered successfully.", {
      user,
      token,
    });
  } catch (error) {
    console.log("Register API Error", error);
    return errorResponse(res, 500, "Internal server error");
  }
};
