import axios from "axios";
import { StarshipModel } from "../../models/starship.model";

async function fetchAndStoreStarships() {
  const count = await StarshipModel.countDocuments();
  if (count > 0) {
    console.log("Starships already stored. Skipping fetch and store.");
    return;
  }
  let nextPageUrl = "https://swapi.dev/api/starships/";

  try {
    while (nextPageUrl) {
      const response = await axios.get(nextPageUrl);
      const starships = response.data.results;
      nextPageUrl = response.data.next;

      for (const starship of starships) {
        // Fetch pilot names
        const pilotNames = await Promise.all(
          starship.pilots.map(async (pilotUrl: string) => {
            try {
              const pilotResponse = await axios.get(pilotUrl);
              return pilotResponse.data.name;
            } catch (error) {
              console.error("Error fetching pilot:", error);
              return null;
            }
          })
        ).then((names) => names.filter((name) => name !== null));

        // Fetch film titles
        const filmTitles = await Promise.all(
          starship.films.map(async (filmUrl: string) => {
            try {
              const filmResponse = await axios.get(filmUrl);
              return filmResponse.data.title;
            } catch (error) {
              console.error("Error fetching film:", error);
              return null;
            }
          })
        ).then((titles) => titles.filter((title) => title !== null));

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
          pilots: pilotNames, // Use fetched pilot names
          films: filmTitles, // Use fetched film titles
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

export { fetchAndStoreStarships };
