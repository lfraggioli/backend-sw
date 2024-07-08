import { getFilms } from "../controllers/films/getFilms";
import { Router } from "express";
import { getFilmsByEpisode } from "../controllers/films/getFilmsByEpisode";

const filmRouter = Router();

filmRouter.get("/", async (req, res) => {
  const { episode } = req.query;
  try {
    if (episode) {
      await getFilmsByEpisode(req, res);
    } else {
      const films = await getFilms();
      res.json(films);
    }
  } catch (error) {
    res.status(500).json(console.error(error));
  }
});

filmRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const films = await getFilms();
    const filteredFilms = films.filter(
      (film) => film.episode_id.toString() === id
    );
    res.json(filteredFilms);
  } catch (error) {
    res.status(500).json(console.error(error));
  }
});

export default filmRouter;
