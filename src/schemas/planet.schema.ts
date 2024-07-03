import mongoose, { Schema } from "mongoose";
import { IPlanet } from "../../interfaces/IPlanet";
// Importa las otras interfaces aquí

// Esquema para IPlanet
export const planetSchema = new Schema<IPlanet>({
  name: { type: String, required: true },
  rotation_period: { type: String, required: true },
  orbital_period: { type: String, required: true },
  diameter: { type: String, required: true },
  climate: { type: String, required: true },
  gravity: { type: String, required: true },
  terrain: { type: String, required: true },
  surface_water: { type: String, required: true },
  population: { type: String, required: true },
  residents: [{ type: String }],
  films: [{ type: String }],
  created: { type: String, required: true },
  edited: { type: String, required: true },
  url: { type: String, required: true },
});
