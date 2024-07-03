import { model } from "mongoose";
import { IFilm } from "./interfaces/IFilm";
import { filmSchema } from "./schemas/film.schema";

export const FilmModel = model<IFilm>("Film", filmSchema);
