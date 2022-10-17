import { createContext, useState, useEffect } from "react";
import clientesAxios from "../config/axios";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);

  const guardarPaciente = async (paciente) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientesAxios.post("/pacientes", paciente, config);
      const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

      setPacientes([pacienteAlmacenado, ...pacientes]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
