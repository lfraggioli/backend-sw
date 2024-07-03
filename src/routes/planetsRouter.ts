import { getPlanets } from "../controllers/planets/getPlanets";
import { Router } from "express";

const planetsRouter = Router();

planetsRouter.get("/", async (req, res) => {
  try {
    const planets = await getPlanets();
    res.json(planets);
  } catch (error) {
    res.status(500).json(console.error(error));
  }
});

export default planetsRouter;
