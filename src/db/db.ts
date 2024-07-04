import mongoose from "mongoose";
import { fetchAll } from "../handlers/db/fetchAll";

const MONGODB_URL =
  "mongodb+srv://fraggiolilucas:fraggiolilucas@cluster0.l3skzfn.mongodb.net/";

mongoose.Promise = Promise;
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Conexión a MongoDB exitosa");

    mongoose.connection.on("connected", async () => {
      console.log("Mongoose está conectado al servidor de MongoDB");
      try {
        await fetchAll();
        console.log(
          "Todas las funciones de búsqueda y almacenamiento se han ejecutado con éxito."
        );
      } catch (error) {
        console.error(
          "Error al ejecutar las funciones de búsqueda y almacenamiento:",
          error
        );
      }
    });
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};
