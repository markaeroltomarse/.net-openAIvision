import { Router } from "express";
import visionRouter from "./vision/vision.route";

const router: Router = Router();
router.use("/vision", visionRouter);

export default router;
