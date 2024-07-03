import { model } from "mongoose";
import { IPlanet } from "./interfaces/IPlanet";
import { planetSchema } from "./schemas/planet.schema";

export const PlanetModel = model<IPlanet>("Planet", planetSchema);
