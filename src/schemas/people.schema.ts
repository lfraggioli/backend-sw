import { Schema } from "mongoose";
import { IPeople } from "../../interfaces/IPeople";

export const peopleSchema = new Schema<IPeople>({
  name: { type: String, required: true },
  height: { type: String, required: true },
  mass: { type: String, required: true },
  hair_color: { type: String, required: true },
  skin_color: { type: String, required: true },
  eye_color: { type: String, required: true },
  birth_year: { type: String, required: true },
  gender: { type: String, required: true },
  homeworld: { type: String, required: true },
  films: [{ type: String }],
  species: [{ type: String }],
  vehicles: [{ type: String }],
  starships: [{ type: String }],
  created: { type: Date, required: true },
  edited: { type: Date, required: true },
  url: { type: String, required: true },
});
