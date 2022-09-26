import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    propietario: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    fecha: {
      type: Date,
      require: true,
    },
    sintomas: {
      type: String,
      require: true,
    },
    veterinario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinario",
    },
  },
  {
    timestamps: true, //Crear columnas de editado y creado
  }
);

const Paciente = mongoose.model("Paciente", pacienteSchema);

export default Paciente;
