import { Request, Response } from "express";
import { findUser, updateUserById } from "../../service/user.service.js";
import { errorResponse, successResponse } from "../../util/response.js";
import { isValidObjectId } from "../../util/validObjectId.js";

export const deleteUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const userId = req.params.userId as string;
    if (!isValidObjectId(userId)) {
      return errorResponse(res, 400, "userId is required or invalid.");
    }
    const user = await findUser({ _id: userId }, { id: 1 });
    if (!user) {
      return errorResponse(res, 404, "This user is not found");
    }
    await updateUserById(userId, { deletedAt: new Date() });
    return successResponse(res, 200, "User deleted successfully.");
  } catch (error) {
    console.log("DeleteUserProfile API Error:", error);
    return successResponse(res, 500, "Internal server error");
  }
};
