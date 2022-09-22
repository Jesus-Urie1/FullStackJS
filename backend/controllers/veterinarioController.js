import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
  const { email } = req.body; //Cuando llenas un formulario

  //Revisar se ya existe el usuario
  const existeUsuario = await Veterinario.findOne({ email });
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    //Guardar un nuevo veterinario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();

    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  res.json({ msg: "Mostrando perfil" });
};

const confirmar = (req, res) => {
  console.log(req.params.token); //Leer datos de la URL
  res.json({ msg: "Confirmando cuenta" });
};

export { registrar, perfil, confirmar };
