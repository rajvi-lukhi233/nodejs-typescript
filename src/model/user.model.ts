import mongoose from "mongoose";
import { IUser } from "../interface/user.interface.js";
import { DB_NAME, ROLE } from "../util/constant.js";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(ROLE),
      default: ROLE.USER,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    otpCode: {
      type: Number,
      default: null,
    },
    otpExpiredAt: {
      type: Date,
      default: null,
    },
    resetPassToken: {
      type: String,
      default: null,
    },
    resetPassTokenExpiredAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (userPassword: string) {
  return await bcrypt.compare(userPassword, this.password);
};

export const userModel = mongoose.model(DB_NAME.user, userSchema);
