import { Router } from "express";
import peopleRouter from "./peopleRouter";
import filmRouter from "./filmRouter";
import planetsRouter from "./planetsRouter";
import starshipsRouter from "./starshipsRouter";

const router = Router();
router.use("/people", peopleRouter);
router.use("/people/:id", peopleRouter);
router.use("/films", filmRouter);
router.use("/films/:id", filmRouter);
router.use("/planets", planetsRouter);
router.use("/planets/:id", planetsRouter);
router.use("/starships", starshipsRouter);
router.use("/starships/:id", starshipsRouter);

export default router;
