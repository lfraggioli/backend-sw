import { Request, Response } from "express";
import { PlanetModel } from "../../models/planet.model";

export const getPlanetsByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    let filterParams: { [key: string]: any } = {};
    if (name) {
      // Usando una expresión regular para hacer una búsqueda insensible a mayúsculas/minúsculas
      filterParams["name"] = { $regex: new RegExp(name.toString(), "i") };
    }

    const filteredPlanets = await PlanetModel.find(filterParams);
    res.json(filteredPlanets);
  } catch (error) {
    res.status(500).json(console.error(error));
  }
};
