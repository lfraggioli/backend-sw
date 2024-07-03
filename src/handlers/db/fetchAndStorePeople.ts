import axios from "axios";
import { PeopleModel } from "../../models/people.model";
import cron from "node-cron";
async function fetchAndStorePeople() {
  const count = await PeopleModel.countDocuments();
  if (count > 0) {
    console.log("People already stored. Skipping fetch and store.");
    return;
  }
  let nextPageUrl = "https://swapi.dev/api/people/";

  try {
    while (nextPageUrl) {
      const response = await axios.get(nextPageUrl);
      const people = response.data.results;
      nextPageUrl = response.data.next; // Actualiza la URL de la siguiente página

      for (const person of people) {
        const personData = {
          name: person.name,
          height: person.height,
          mass: person.mass,
          hair_color: person.hair_color,
          skin_color: person.skin_color,
          eye_color: person.eye_color,
          birth_year: person.birth_year,
          gender: person.gender,
          homeworld: person.homeworld,
          films: person.films,
          species: person.species,
          vehicles: person.vehicles,
          starships: person.starships,
          created: new Date(person.created),
          edited: new Date(person.edited),
          url: person.url,
        };

        await PeopleModel.updateOne({ url: person.url }, personData, {
          upsert: true,
        });
      }
    }
  } catch (error) {
    console.error("Error fetching or storing people:", error);
  }
}

cron.schedule("0 0 * * *", () => {
  console.log("Running fetchAndStorePeople at midnight");
  fetchAndStorePeople();
});

export { fetchAndStorePeople };
