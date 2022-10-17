import { createContext, useState, useEffect } from "react";
import clientesAxios from "../config/axios";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
