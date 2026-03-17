var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import { DB_NAME, ROLE } from "../util/constant.js";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
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
}, { timestamps: true, versionKey: false });
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return;
        const salt = yield bcrypt.genSalt(10);
        this.password = yield bcrypt.hash(this.password, salt);
    });
});
userSchema.methods.comparePassword = function (userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(userPassword, this.password);
    });
};
export const userModel = mongoose.model(DB_NAME.user, userSchema);
//# sourceMappingURL=user.model.js.map