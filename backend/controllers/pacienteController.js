import Paciente from "../models/Paciente.js ";

const agregarPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.veterinario = req.veterinario._id;
  try {
    const pacienteAlmacenado = await paciente.save();
    res.json(pacienteAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerPaciente = async (req, res) => {
  const paciente = await Paciente.find()
    .where("veterinario")
    .equals(req.veterinario);

  res.json(paciente);
};

export { agregarPaciente, obtenerPaciente };
