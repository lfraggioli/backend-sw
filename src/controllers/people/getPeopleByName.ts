import { Request, Response } from "express";
import { PeopleModel } from "../../models/people.model";

export const getPeopleByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    let filterParams: { [key: string]: any } = {};
    if (name) {
      // Usando una expresión regular para hacer una búsqueda insensible a mayúsculas/minúsculas
      filterParams["name"] = { $regex: new RegExp(name.toString(), "i") };
    }

    const filteredPeople = await PeopleModel.find(filterParams);
    res.json(filteredPeople);
  } catch (error) {
    res.status(500).json(console.error(error));
  }
};
