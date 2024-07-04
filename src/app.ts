import express from "express";
import { connectDB } from "./db/db";
import router from "./routes";
var cors = require("cors");

const app = express();

app.get("/", (req, res) => {
  res.send("API de Star Wars está funcionando!");
});

app.use(express.json());
app.use(router);
app.use(cors());
connectDB();
const PORT = 3000;

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}
export default app;
