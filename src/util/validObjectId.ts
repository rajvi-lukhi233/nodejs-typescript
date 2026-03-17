import mongoose from "mongoose";

export const isValidObjectId = (id: string) => {
  return !!id && mongoose.Types.ObjectId.isValid(id);
};
