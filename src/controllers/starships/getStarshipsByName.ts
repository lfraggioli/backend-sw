import { Request, Response } from "express";
import { StarshipModel } from "../../models/starship.model";

export const getStarshipsByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    let filterParams: { [key: string]: any } = {};
    if (name) {
      // Usando una expresión regular para hacer una búsqueda insensible a mayúsculas/minúsculas
      filterParams["name"] = { $regex: new RegExp(name.toString(), "i") };
    }

    const filteredStarships = await StarshipModel.find(filterParams);
    res.json(filteredStarships);
  } catch (error) {
    res.status(500).json(console.error(error));
  }
};
