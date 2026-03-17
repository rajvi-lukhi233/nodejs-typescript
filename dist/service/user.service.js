import { userModel } from "../model/user.model.js";
export const createUser = (data) => {
    return userModel.create(data);
};
export const findUser = (filter, option = {}) => {
    return userModel.findOne(Object.assign(Object.assign({}, filter), { deletedAt: null }), option);
};
export const updateUserById = (id, data) => {
    return userModel.findByIdAndUpdate(id, data, { new: true });
};
//# sourceMappingURL=user.service.js.map