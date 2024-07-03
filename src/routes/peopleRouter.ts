import { getPeople } from "../controllers/people/getPeople";
import { Router } from "express";
import { getPeopleByName } from "../controllers/people/getPeopleByName";

const peopleRouter = Router();

peopleRouter.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      await getPeopleByName(req, res);
    } else {
      const people = await getPeople();
      res.json(people);
    }
  } catch (error) {
    res.status(500).json(console.error(error));
  }
});

export default peopleRouter;
