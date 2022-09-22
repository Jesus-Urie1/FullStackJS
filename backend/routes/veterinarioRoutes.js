import express from "express";
import {
  registrar,
  perfil,
  confirmar,
  authenticar,
} from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", authenticar);

router.get("/perfil", checkAuth, perfil);

export default router;
