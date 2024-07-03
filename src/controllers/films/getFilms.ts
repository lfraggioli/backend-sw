import { FilmModel } from "../../models/film.model";

export const getFilms = async () => {
  const films = await FilmModel.find();
  return films;
};
