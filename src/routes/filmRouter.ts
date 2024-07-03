import { getFilms } from "../controllers/films/getFilms";
import { Router } from "express";

const filmRouter = Router();

filmRouter.get("/", async (req, res) => {
  try {
    const films = await getFilms();
    res.json(films);
  } catch (error) {
    res.status(500).json(console.error(error));
  }
});

export default filmRouter;
