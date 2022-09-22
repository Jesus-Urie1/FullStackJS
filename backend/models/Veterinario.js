import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

//Hasheando el password
veterinarioSchema.pre("save", async function (next) {
  //Un password que ya esta hasheado, no lo vuelva a hashear
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10); //Generar el Salt
  this.password = await bcrypt.hash(this.password, salt); //Hasheando el password
});

//Comprobando password
veterinarioSchema.methods.comprobarPassword = async function (
  passwordFormulario
) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const Veterinario = mongoose.model("Veterinario", veterinarioSchema); //Registrar el modelo

export default Veterinario;
