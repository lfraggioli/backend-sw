import axios from "axios";
import { PeopleModel } from "../../models/people.model";

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
      nextPageUrl = response.data.next; // Updates the URL for the next page

      for (const person of people) {
        // Fetch and store film titles
        const filmTitles = await Promise.all(
          person.films.map(async (url: string) => {
            try {
              const res = await axios.get(url);
              return res.data.title;
            } catch (error) {
              console.error("Error fetching film data:", error);
              return null;
            }
          })
        ).then((titles) => titles.filter(Boolean)); // Filter out any nulls due to errors

        // Fetch and store species names
        const speciesNames = await Promise.all(
          person.species.map(async (url: string) => {
            try {
              const res = await axios.get(url);
              return res.data.name;
            } catch (error) {
              console.error("Error fetching species data:", error);
              return null;
            }
          })
        ).then((names) => names.filter(Boolean)); // Filter out any nulls due to errors

        // Fetch and store starship names
        const starshipNames = await Promise.all(
          person.starships.map(async (url: string) => {
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
          person.vehicles.map(async (url: string) => {
            try {
              const res = await axios.get(url);
              return res.data.name;
            } catch (error) {
              console.error("Error fetching vehicle data:", error);
              return null;
            }
          })
        ).then((names) => names.filter(Boolean)); // Filter out any nulls due to errors
        const homeworldName = await axios
          .get(person.homeworld)
          .then((response) => response.data.name)
          .catch((error) => {
            console.error("Error fetching homeworld data:", error);
            return "";
          });
        const personData = {
          name: person.name,
          height: person.height,
          mass: person.mass,
          hair_color: person.hair_color,
          skin_color: person.skin_color,
          eye_color: person.eye_color,
          birth_year: person.birth_year,
          gender: person.gender,
          homeworld: homeworldName,
          films: filmTitles,
          species: speciesNames,
          vehicles: vehicleNames,
          starships: starshipNames,
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

export { fetchAndStorePeople };
