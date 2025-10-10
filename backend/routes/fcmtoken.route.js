import { Router } from "express";
import { saveTokenController , sendNotificationController ,triggerHourlyNotificationController, getSchedulerStatusController, controlSchedulerController} from "../controller/notification.controller.js";
const fcmtokenRouter = Router();

fcmtokenRouter.post("/save-fcm-token",saveTokenController)
fcmtokenRouter.post("/send-notification",sendNotificationController )
fcmtokenRouter.post("/trigger-hourly", triggerHourlyNotificationController);
fcmtokenRouter.get("/scheduler-status", getSchedulerStatusController);
fcmtokenRouter.post("/control-scheduler", controlSchedulerController)

export default fcmtokenRouter;