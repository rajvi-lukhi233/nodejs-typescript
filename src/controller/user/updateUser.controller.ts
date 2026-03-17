import { Request, Response } from "express";
import { findUser, updateUserById } from "../../service/user.service.js";
import { errorResponse, successResponse } from "../../util/response.js";
import { isValidObjectId } from "../../util/validObjectId.js";

export const updateUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const userId = req.params.userId as string;
    const { name, email } = req.body;
    if (!isValidObjectId(userId)) {
      return errorResponse(res, 400, "userId is required or invalid.");
    }
    if (email) {
      const existUser = await findUser({ email }, { _id: 1 });
      if (existUser) {
        return errorResponse(
          res,
          400,
          "This email is already registered please use other email.",
        );
      }
    }
    const updatedUser = await updateUserById(userId, { name, email });
    if (updatedUser) {
      return successResponse(
        res,
        200,
        "User profile updated successfully.",
        updatedUser,
      );
    }
    return errorResponse(res, 400, "User profile not updated.");
  } catch (error) {
    console.log("UpdateUserProfile API Error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};
