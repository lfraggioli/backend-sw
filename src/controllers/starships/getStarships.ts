import { StarshipModel } from "../../models/starship.model";

export const getStarships = async () => {
  const starships = await StarshipModel.find();
  return starships;
};
