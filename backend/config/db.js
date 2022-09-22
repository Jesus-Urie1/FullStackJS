import mongoose from "mongoose";

//Conectando a la BD con variables de entorno
const conectarDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB);

    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`MongoDB conectado en: ${url}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};

export default conectarDB;
