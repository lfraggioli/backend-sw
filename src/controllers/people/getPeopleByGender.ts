import { Request, Response } from "express";
import { PeopleModel } from "../../models/people.model";

export const getPeopleByGender = async (req: Request, res: Response) => {
  try {
    const { gender } = req.query;
    let filterParams: { [key: string]: any } = {};
    if (gender) {
      // Filtrando directamente por el valor de gender, asumiendo que es exacto
      filterParams["gender"] = gender.toString();
    }

    const filteredPeople = await PeopleModel.find(filterParams);
    res.json(filteredPeople);
  } catch (error) {
    res.status(500).json(console.error(error));
  }
};
