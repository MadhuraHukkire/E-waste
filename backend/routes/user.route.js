import { Router } from "express";
import { userRegisterController ,getUserProfileController, updateUserProfileController, userLoginController, logoutController, refreshAccessTokenController} from "../controller/user.controller.js";
const userRouter = Router();
import { authMiddleware } from "../middleware/authMiddleware.js";


userRouter.post('/register', userRegisterController);
userRouter.post('/login', userLoginController);
userRouter.get('/profile', authMiddleware, getUserProfileController);
userRouter.put('/profile', authMiddleware, updateUserProfileController);
userRouter.post('/logout', authMiddleware,logoutController)
userRouter.post('/refresh-token',refreshAccessTokenController)

export default userRouter;