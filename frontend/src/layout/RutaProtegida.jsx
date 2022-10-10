import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando...";
  return (
    <>
      <Header />
      {auth?._id ? <Outlet /> : <Navigate to="/" />}
      <Footer />
    </>
  );
};

export default RutaProtegida;
