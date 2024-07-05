import axios from "axios";
import { FilmModel } from "../../models/film.model";
import { imageUrls } from "./data/imageUrl";

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
        const imageUrl = imageUrls[film.episode_id];
        // Fetch and store character names
        const characterNames = await Promise.all(
          film.characters.map(async (url: string) => {
            try {
              const res = await axios.get(url);
              return res.data.name;
            } catch (error) {
              console.error("Error fetching character data:", error);
              return null;
            }
          })
        ).then((names) => names.filter(Boolean)); // Filter out any nulls due to errors

        // Fetch and store planet names
        const planetNames = await Promise.all(
          film.planets.map(async (url: string) => {
            try {
              const res = await axios.get(url);
              return res.data.name;
            } catch (error) {
              console.error("Error fetching planet data:", error);
              return null;
            }
          })
        ).then((names) => names.filter(Boolean)); // Filter out any nulls due to errors

        // Fetch and store starship names
        const starshipNames = await Promise.all(
          film.starships.map(async (url: string) => {
            try {
              const res = await axios.get(url);
              return res.data.name;
            } catch (error) {
              console.error("Error fetching starship data:", error);
              return null;
            }
          })
        ).then((names) => names.filter(Boolean)); // Filter out any nulls due to errors

        // Fetch and store vehicle names
        const vehicleNames = await Promise.all(
          film.vehicles.map(async (url: string) => {
            try {
              const res = await axios.get(url);
              return res.data.name;
            } catch (error) {
              console.error("Error fetching vehicle data:", error);
              return null;
            }
          })
        ).then((names) => names.filter(Boolean)); // Filter out any nulls due to errors

        // Fetch and store species names
        const speciesNames = await Promise.all(
          film.species.map(async (url: string) => {
            try {
              const res = await axios.get(url);
              return res.data.name;
            } catch (error) {
              console.error("Error fetching species data:", error);
              return null;
            }
          })
        ).then((names) => names.filter(Boolean)); // Filter out any nulls due to errors

        const newFilm = new FilmModel({
          title: film.title,
          episode_id: film.episode_id,
          opening_crawl: film.opening_crawl,
          director: film.director,
          producer: film.producer,
          release_date: new Date(film.release_date),
          characters: characterNames,
          planets: planetNames,
          starships: starshipNames,
          vehicles: vehicleNames,
          species: speciesNames,
          created: new Date(film.created),
          edited: new Date(film.edited),
          url: film.url,
          imageUrl: imageUrl,
        });
        await newFilm.save();
      }
    }
  } catch (error) {
    console.error("Error fetching and storing films:", error);
  }
}

export { fetchAndStoreFilms };
