import axios from "axios";
import { StarshipModel } from "../../models/starship.model";
import cron from "node-cron";
async function fetchAndStoreStarships() {
  const count = await StarshipModel.countDocuments();
  if (count > 0) {
    console.log("Starships already stored. Skipping fetch and store.");
    return; // Salir de la función si ya hay datos almacenados
  }
  let nextPageUrl = "https://swapi.dev/api/starships/";

  try {
    while (nextPageUrl) {
      const response = await axios.get(nextPageUrl);
      const starships = response.data.results;
      nextPageUrl = response.data.next;

      for (const starship of starships) {
        const newStarship = new StarshipModel({
          name: starship.name,
          starshipModel: starship.model,
          manufacturer: starship.manufacturer,
          cost_in_credits: starship.cost_in_credits,
          length: starship.length,
          max_atmosphering_speed: starship.max_atmosphering_speed,
          crew: starship.crew,
          passengers: starship.passengers,
          cargo_capacity: starship.cargo_capacity,
          consumables: starship.consumables,
          hyperdrive_rating: starship.hyperdrive_rating,
          MGLT: starship.MGLT,
          starship_class: starship.starship_class,
          pilots: starship.pilots,
          films: starship.films,
          created: new Date(starship.created),
          edited: new Date(starship.edited),
          url: starship.url,
        });
        await newStarship.save();
      }
    }
  } catch (error) {
    console.error("Error fetching and storing starships:", error);
  }
}

cron.schedule("0 0 * * *", () => {
  console.log("Running fetchAndStoreStarships at midnight");
  fetchAndStoreStarships();
});

export { fetchAndStoreStarships };
