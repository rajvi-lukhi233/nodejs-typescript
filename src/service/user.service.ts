import { IUser } from "../interface/user.interface.js";
import { userModel } from "../model/user.model.js";
import { HydratedDocument, ProjectionType, QueryFilter } from "mongoose";

export const createUser = (data: IUser): Promise<HydratedDocument<IUser>> => {
  return userModel.create(data);
};

export const findUser = (
  filter: QueryFilter<IUser>,
  option: ProjectionType<IUser> = {},
): Promise<HydratedDocument<IUser> | null> => {
  return userModel.findOne({ ...filter, deletedAt: null }, option);
};

export const updateUserById = (
  id: string,
  data: Partial<IUser>,
): Promise<IUser | null> => {
  return userModel.findByIdAndUpdate(id, data, { new: true });
};
