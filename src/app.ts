import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("API de Star Wars está funcionando!");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
