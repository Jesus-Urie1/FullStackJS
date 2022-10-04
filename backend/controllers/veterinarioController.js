import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

//Controller Registrar cuenta
const registrar = async (req, res) => {
  const { email, nombre } = req.body; //Cuando llenas un formulario

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

    //Enviar el email
    emailRegistro({
      email,
      nombre,
      token: veterinarioGuardado.token,
    });

    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

//Controller Perfil
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

    //Enviar email con instrucciones
    emailOlvidePassword({
      email,
      nombre: existeVeterinario.nombre,
      token: existeVeterinario.token,
    });
    res.json({ msg: "Hemos enviado un email con las intrucciones" });
  } catch (error) {
    console.log(error);
  }
};

//Controller Comprobar Token
const comprobarToken = async (req, res) => {
  const { token } = req.params; //Obteniendo token

  const tokenValido = await Veterinario.findOne({ token });

  if (tokenValido) {
    //El token es valido
    res.json({ msg: "Token valido y el usuario existe" });
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }
};

//Controller Nuevo password
const nuevoPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const veterinario = await Veterinario.findOne({ token });
  if (!veterinario) {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }

  try {
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    res.json({ msg: "Password modificado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  registrar,
  perfil,
  confirmar,
  authenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
};
