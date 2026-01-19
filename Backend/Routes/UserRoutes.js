import express from "express"
import { isCurrent, otpVerify, signin, signOut, signUp } from "../Controller/authController.js"
import { deleteUser, getAllUser, getSingleUser, profile, updateUser } from "../Controller/userController.js";
import { verifyTokenFun } from "../Model/verifyToken.js";
import { upload } from "../config/multer.js";
export const userAuthRouter = express.Router();
export const userRouter = express.Router();

userAuthRouter.post("/signup",upload.single("image") ,signUp);
userAuthRouter.post("/signin", signin);
userAuthRouter.get("/signout", signOut);
userAuthRouter.get("/iscurrent", verifyTokenFun,isCurrent);
userRouter.get("/profile", verifyTokenFun, profile);
userRouter.get("/users", getAllUser);
userRouter.delete("/users/:id", deleteUser);
userRouter.get("/users/:id", getSingleUser);
userRouter.patch("/users/:id", upload.single("image"), updateUser);
userRouter.post("/otp",upload.single("image"),otpVerify);