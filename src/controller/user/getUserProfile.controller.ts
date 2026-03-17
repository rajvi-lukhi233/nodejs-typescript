import { Request, Response } from "express";
import { findUser } from "../../service/user.service.js";
import { errorResponse, successResponse } from "../../util/response.js";
import { isValidObjectId } from "mongoose";

export const getUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const { userId } = req.params;
    if (!isValidObjectId(userId)) {
      return errorResponse(res, 400, "userId is required or invalid.");
    }
    const user: any = await findUser({ _id: userId });

    if (!user) {
      return errorResponse(res, 404, "This user is not found.");
    }
    return successResponse(res, 200, "User profile retrive successfully", user);
  } catch (error) {
    console.log("GetUserProfile API Error:", error);
    return errorResponse(res, 500, "Internal server error");
  }
};
