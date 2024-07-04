import { getStarships } from "../controllers/starships/getStarships";
import { Router } from "express";
import { getStarshipsByName } from "../controllers/starships/getStarshipsByName";

const starshipsRouter = Router();

starshipsRouter.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      await getStarshipsByName(req, res);
    } else {
      const starships = await getStarships();
      res.json(starships);
    }
  } catch (error) {
    res.status(500).json(console.error(error));
  }
});

export default starshipsRouter;
