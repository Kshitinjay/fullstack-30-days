import { Router } from "express";
import { getHealth , getInfo} from "../controllers/system.controller.js";

const router = Router();

router.get("/health", getHealth);

router.get("/api/info", getInfo);

export default router;