import { Router } from "express";
import { TextMessageController } from "../controller/messageController.js";
const aiRouter = Router();

aiRouter.post("/chat",TextMessageController)

export default aiRouter;
