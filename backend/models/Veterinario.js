import mongoose from "mongoose";
import generarId from "../helpers/generarId.js";

//Schema de Veterinario
const veterinarioSchema = mongoose.Schema({
  nombre: {
    type: String, //Tipo de dato
    required: true, //Validacion del servidor
    trim: true, //Eliminamos los espacion en blanco
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, //Garantizamos que usamos un email por cuenta
    trim: true,
  },
  telefono: {
    type: String,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: generarId(),
  },
  confirmado: {
    //Para confirmar cuenta
    type: Boolean,
    default: false,
  },
});

const Veterinario = mongoose.model("Veterinario", veterinarioSchema); //Registrar el modelo

export default Veterinario;
