import axios from "axios";
import { PlanetModel } from "../../models/planet.model";
import cron from "node-cron";

async function fetchAndStorePlanets() {
  const count = await PlanetModel.countDocuments();
  if (count > 0) {
    console.log("Planets already stored. Skipping fetch and store.");
    return;
  }
  let nextPageUrl = "https://swapi.dev/api/planets/";

  try {
    while (nextPageUrl) {
      const response = await axios.get(nextPageUrl);
      const planets = response.data.results;
      nextPageUrl = response.data.next; // Preparar la URL de la próxima página para la siguiente iteración

      for (const planet of planets) {
        const newPlanet = new PlanetModel({
          name: planet.name,
          rotation_period: planet.rotation_period,
          orbital_period: planet.orbital_period,
          diameter: planet.diameter,
          climate: planet.climate,
          gravity: planet.gravity,
          terrain: planet.terrain,
          surface_water: planet.surface_water,
          population: planet.population,
          residents: planet.residents,
          films: planet.films,
          created: planet.created,
          edited: planet.edited,
          url: planet.url,
        });
        await newPlanet.save();
      }
    }
  } catch (error) {
    console.error("Error fetching and storing planets:", error);
  }
}

cron.schedule("0 0 * * *", () => {
  console.log("Running fetchAndStorePlanets at midnight");
  fetchAndStorePlanets();
});

export { fetchAndStorePlanets };
