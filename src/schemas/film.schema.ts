import { Schema } from "mongoose";
import { IFilm } from "../interfaces/IFilm";

export const filmSchema = new Schema<IFilm>({
  title: { type: String, required: true },
  episode_id: { type: Number, required: true },
  opening_crawl: { type: String, required: true },
  director: { type: String, required: true },
  producer: { type: String, required: true },
  release_date: { type: Date, required: true },
  characters: [{ type: String }],
  planets: [{ type: String }],
  starships: [{ type: String }],
  vehicles: [{ type: String }],
  species: [{ type: String }],
  created: { type: Date, required: true },
  edited: { type: Date, required: true },
  url: { type: String, required: true },
});
