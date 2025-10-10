import { Router } from "express";
import { addShopController,  getShopsController, myShopsController, searchShopsController ,getPendingShopsController, approveShopController, rejectShopController} from "../controller/shop.controller.js";
const shopRouter = Router();
import upload from "../middleware/upload.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

shopRouter.post("/addShop",authMiddleware,upload.array("images", 5), addShopController)
shopRouter.get("/get-shops", getShopsController)
shopRouter.get("/get-my-shops",authMiddleware, myShopsController)
shopRouter.get("/search", searchShopsController);

shopRouter.get("/pending-shops", authMiddleware, getPendingShopsController);
shopRouter.put("/approve-shop/:shopId", authMiddleware, approveShopController);
shopRouter.put("/reject-shop/:shopId", authMiddleware, rejectShopController);

export default shopRouter;