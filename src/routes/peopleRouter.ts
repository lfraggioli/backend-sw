import { getPeople } from "../controllers/people/getPeople";
import { Router } from "express";
import { getPeopleByName } from "../controllers/people/getPeopleByName";
import { getPeopleByGender } from "../controllers/people/getPeopleByGender";

const peopleRouter = Router();

peopleRouter.get("/", async (req, res) => {
  const { name, gender } = req.query;
  try {
    if (name) {
      await getPeopleByName(req, res);
    } else if (gender) {
      await getPeopleByGender(req, res);
    } else {
      const people = await getPeople();
      res.json(people);
    }
  } catch (error) {
    res.status(500).json(console.error(error));
  }
});

peopleRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const people = await getPeople();
    const filteredPeople = people.filter((person) => person._id === id);
    res.json(filteredPeople);
  } catch (error) {
    res.status(500).json(console.error(error));
  }
});

export default peopleRouter;
