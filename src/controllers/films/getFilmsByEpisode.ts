import { Request, Response } from "express";
import { FilmModel } from "../../models/film.model";

export const getFilmsByEpisode = async (req: Request, res: Response) => {
  try {
    const { episode } = req.query;
    let filterParams: { [key: string]: any } = {};
    if (episode) {
      // Convertir episode a número
      const episodeNumber = parseInt(episode.toString(), 10);
      // Verificar si episodeNumber es un número válido
      if (!isNaN(episodeNumber)) {
        filterParams["episode_id"] = episodeNumber;
      } else {
        // Si episode no es un número, enviar un error
        return res.status(400).json({ error: "Episode must be a number" });
      }
    }

    const filteredFilms = await FilmModel.find(filterParams);
    res.json(filteredFilms);
  } catch (error) {
    res.status(500).json(console.error(error));
  }
};
