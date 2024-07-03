import axios from "axios";
import { FilmModel } from "../../models/film.model";
import cron from "node-cron";
async function fetchAndStoreFilms() {
  const count = await FilmModel.countDocuments();
  if (count > 0) {
    console.log("Films already stored. Skipping fetch and store.");
    return;
  }
  try {
    const response = await axios.get("https://swapi.dev/api/films/");
    const films = response.data.results;
    if (films) {
      for (const film of films) {
        const newFilm = new FilmModel({
          title: film.title,
          episode_id: film.episode_id,
          opening_crawl: film.opening_crawl,
          director: film.director,
          producer: film.producer,
          release_date: new Date(film.release_date),
          characters: film.characters,
          planets: film.planets,
          starships: film.starships,
          vehicles: film.vehicles,
          species: film.species,
          created: new Date(film.created),
          edited: new Date(film.edited),
          url: film.url,
        });
        await newFilm.save();
      }
    }
  } catch (error) {
    console.error("Error fetching and storing films:", error);
  }
}

cron.schedule("0 0 * * *", () => {
  console.log("Running fetchAndStoreFilms at midnight");
  fetchAndStoreFilms();
});

export { fetchAndStoreFilms };
