import { getPlanets } from "../controllers/planets/getPlanets";
import { Router } from "express";
import { getPlanetsByName } from "../controllers/planets/getPlanetsByName";

const planetsRouter = Router();

planetsRouter.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      await getPlanetsByName(req, res);
    } else {
      const planets = await getPlanets();
      res.json(planets);
    }
  } catch (error) {
    res.status(500).json(console.error(error));
  }
});

planetsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const planets = await getPlanets();
    const filteredPlanets = planets.filter((planet) => planet._id === id);
    res.json(filteredPlanets);
  } catch (error) {
    res.status(500).json(console.error(error));
  }
});

export default planetsRouter;
