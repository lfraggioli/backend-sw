import { Router } from "express";
import peopleRouter from "./peopleRouter";
import filmRouter from "./filmRouter";
import planetsRouter from "./planetsRouter";
import starshipsRouter from "./starshipsRouter";

const router = Router();
router.use("/people", peopleRouter);
router.use("/films", filmRouter);
router.use("/planets", planetsRouter);
router.use("/starships", starshipsRouter);

export default router;
