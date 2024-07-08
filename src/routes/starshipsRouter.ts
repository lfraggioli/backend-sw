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

starshipsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const starships = await getStarships();
    const filteredStarships = starships.filter(
      (starship) => starship._id === id
    );
    res.json(filteredStarships);
  } catch (error) {
    res.status(500).json(console.error(error));
  }
});

export default starshipsRouter;
