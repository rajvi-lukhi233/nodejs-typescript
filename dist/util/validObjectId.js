import mongoose from "mongoose";
export const isValidObjectId = (id) => {
    return !!id && mongoose.Types.ObjectId.isValid(id);
};
//# sourceMappingURL=validObjectId.js.map