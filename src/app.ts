import express from "express";
import router from "./routes";
import mongoose from "mongoose";
import { fetchAll } from "./handlers/db/fetchAll";
var cors = require("cors");

const app = express();

app.get("/", (req, res) => {
  res.send("API de Star Wars está funcionando!");
});

app.use(express.json());
app.use(router);
app.use(cors());

const MONGODB_URL =
  "mongodb+srv://fraggiolilucas:fraggiolilucas@cluster0.l3skzfn.mongodb.net/";

mongoose.Promise = Promise;
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch((error) => console.error("Error al conectar a MongoDB:", error));
mongoose.connection.on("connected", () => {
  console.log("Mongoose está conectado al servidor de MongoDB");
  fetchAll()
    .then(() =>
      console.log(
        "Todas las funciones de búsqueda y almacenamiento se han ejecutado con éxito."
      )
    )
    .catch((error) =>
      console.error(
        "Error al ejecutar las funciones de búsqueda y almacenamiento:",
        error
      )
    );
});

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

export default app;
