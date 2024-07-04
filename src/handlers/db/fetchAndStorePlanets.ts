import axios from "axios";
import { PlanetModel } from "../../models/planet.model";

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
      nextPageUrl = response.data.next;

      for (const planet of planets) {
        let residentNames = [];
        for (const residentUrl of planet.residents) {
          try {
            const residentResponse = await axios.get(residentUrl);
            residentNames.push(residentResponse.data.name);
          } catch (error) {
            console.error("Error fetching resident data:", error);
          }
        }
        let filmTitles = await Promise.all(
          planet.films.map(async (filmUrl: string) => {
            try {
              const filmResponse = await axios.get(filmUrl);
              return filmResponse.data.title;
            } catch (error) {
              console.error("Error fetching film data:", error);
              return null;
            }
          })
        ).then((titles) => titles.filter(Boolean));
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
          residents: residentNames,
          films: filmTitles,
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

export { fetchAndStorePlanets };
