import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";

//Controller Registrar cuenta
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
  const { veterinario } = req;
  res.json({ veterinario });
};

//Controller Confirmar cuenta
const confirmar = async (req, res) => {
  const { token } = req.params; //Leer datos de la URL

  const usuarioConfirmar = await Veterinario.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();

    res.json({ msg: "Usuario confirmado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

//Controller Authenticar
const authenticar = async (req, res) => {
  const { email, password } = req.body;

  //Comprobar si usuario existe
  const usuario = await Veterinario.findOne({ email });

  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  //Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no a sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  //Revisar el password
  if (await usuario.comprobarPassword(password)) {
    //Authenticar al usuario con JWT
    res.json({ token: generarJWT(usuario.id) });
  } else {
    const error = new Error("Password incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

//Controller Olvide Password
const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const existeVeterinario = await Veterinario.findOne({ email });

  if (!existeVeterinario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeVeterinario.token = generarId();
    await existeVeterinario.save();
    res.json({ msg: "Hemos enviado un email con las intrucciones" });
  } catch (error) {
    console.log(error);
  }
};

//Controller Comprobar Token
const comprobarToken = (req, res) => {};

//Controller Nuevo password
const nuevoPassword = (req, res) => {};

export {
  registrar,
  perfil,
  confirmar,
  authenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
};
