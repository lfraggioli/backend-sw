import { PlanetModel } from "../../models/planet.model";

export const getPlanets = async () => {
  const planets = await PlanetModel.find();
  return planets;
};
