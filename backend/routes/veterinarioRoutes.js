import express from "express";
import {
  registrar,
  perfil,
  confirmar,
  authenticar,
} from "../controllers/veterinarioController.js";

const router = express.Router();

router.post("/", registrar);

router.get("/perfil", perfil);

router.get("/confirmar/:token", confirmar);

router.post("/login", authenticar);

export default router;
