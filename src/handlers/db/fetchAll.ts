import { fetchAndStoreFilms } from "./fetchAndStoreFilms";
import { fetchAndStorePeople } from "./fetchAndStorePeople";
import { fetchAndStorePlanets } from "./fetchAndStorePlanets";
import { fetchAndStoreStarships } from "./fetchAndStoreStarships";

async function fetchAll() {
  try {
    // Asumiendo que todas las funciones retornan promesas y pueden ser ejecutadas en paralelo
    // Utiliza Promise.all para ejecutarlas todas al mismo tiempo y esperar a que todas terminen
    await Promise.all([
      fetchAndStoreFilms(),
      fetchAndStoreStarships(),
      fetchAndStorePeople(),
      fetchAndStorePlanets(),
    ]);
    console.log(
      "Todas las funciones fetchAndStore se han ejecutado exitosamente."
    );
  } catch (error) {
    console.error("Error al ejecutar las funciones fetchAndStore:", error);
  }
}

export { fetchAll };
