import { Outlet } from "react-router-dom";

const RutaProtegida = () => {
  return (
    <>
      <h1>Ruta protegida</h1>
      <Outlet />
    </>
  );
};

export default RutaProtegida;
