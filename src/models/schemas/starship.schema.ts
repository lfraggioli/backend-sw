import { Schema } from "mongoose";
import { IStarship } from "../interfaces/IStarship";

export const starshipSchema = new Schema<IStarship>({
  name: { type: String, required: true },
  starshipModel: { type: String, required: true },
  manufacturer: { type: String, required: true },
  cost_in_credits: { type: String, required: true },
  length: { type: String, required: true },
  max_atmosphering_speed: { type: String, required: true },
  crew: { type: String, required: true },
  passengers: { type: String, required: true },
  cargo_capacity: { type: String, required: true },
  consumables: { type: String, required: true },
  hyperdrive_rating: { type: String, required: true },
  MGLT: { type: String, required: true },
  starship_class: { type: String, required: true },
  pilots: [{ type: String }],
  films: [{ type: String }],
  created: { type: Date, required: true },
  edited: { type: Date, required: true },
  url: { type: String, required: true },
});
