import { getStarships } from "../controllers/starships/getStarships";
import { Router } from "express";

const starshipsRouter = Router();

starshipsRouter.get("/", async (req, res) => {
  try {
    const starships = await getStarships();
    res.json(starships);
  } catch (error) {
    res.status(500).json(console.error(error));
  }
});

export default starshipsRouter;
