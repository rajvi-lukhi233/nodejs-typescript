import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { updateUserProfile } from "../controller/user/updateUser.controller.js";
import { deleteUserProfile } from "../controller/user/deleteUser.controller.js";
import { getUserProfile } from "../controller/user/getUserProfile.controller.js";
const route = express.Router();

route.get("/:userId", auth, getUserProfile);
route.patch("/:userId", auth, updateUserProfile);
route.delete("/:userId", auth, deleteUserProfile);

export default route;
