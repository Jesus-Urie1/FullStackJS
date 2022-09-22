import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";

//Inicializamos express
const app = express();

//Le decimos que le enviaremos datos en json a express
app.use(express.json());

//Config variables de entorno
dotenv.config();

conectarDB();

app.use("/api/veterinarios", veterinarioRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
