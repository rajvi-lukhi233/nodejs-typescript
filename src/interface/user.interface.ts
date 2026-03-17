import { ROLE } from "../util/constant.js";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: (typeof ROLE)[keyof typeof ROLE];
  deletedAt?: Date;
  otpCode?: number | null;
  otpExpiredAt?: Date | null;
  resetPassToken?: string | null;
  resetPassTokenExpiredAt?: Date | null;
}
