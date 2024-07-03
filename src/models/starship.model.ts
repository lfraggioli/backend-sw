import { model } from "mongoose";
import { IStarship } from "./interfaces/IStarship";
import { starshipSchema } from "./schemas/starship.schema";

export const StarshipModel = model<IStarship>("Starship", starshipSchema);
