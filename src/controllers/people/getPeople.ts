import { PeopleModel } from "../../models/people.model";

export const getPeople = async () => {
  const people = await PeopleModel.find();
  return people;
};
