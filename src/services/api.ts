import axios from "axios";
import { PlanetModel } from "../models/planet.model";
import { IPlanet } from "../interfaces/IPlanet";
// Constantes
const BASE_URL = "https://swapi.dev/api";

// Funciones de la API
export const fetchPlanets = async (): Promise<IPlanet[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/planets`);
    // Transforma los datos de la API en instancias del modelo PlanetModel
    const planets = formatPlanetsData(response.data);
    return planets;
  } catch (error) {
    console.error("Error al obtener los planetas:", error);
    throw error;
  }
};

// Funciones de Formateo
function formatPlanetsData(apiResponse: any): IPlanet[] {
  return apiResponse.results.map((planetData: any) => {
    // Crea una instancia del modelo PlanetModel para cada planeta
    const planet = new PlanetModel({
      name: planetData.name,
      rotation_period: planetData.rotation_period,
      orbital_period: planetData.orbital_period,
      diameter: planetData.diameter,
      climate: planetData.climate,
      gravity: planetData.gravity,
      terrain: planetData.terrain,
      surface_water: planetData.surface_water,
      population: planetData.population,
      residents: planetData.residents,
      films: planetData.films,
      created: planetData.created,
      edited: planetData.edited,
      url: planetData.url,
    });

    //TODO: Aquí podrías hacer operaciones adicionales con el documento, como guardarlo en la base de datos > await planet.save();
    return planet;
  });
}
