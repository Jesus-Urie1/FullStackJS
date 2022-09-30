import { useEffect,useState } from "react";
import { useParams, Link } from "react-router-dom"
import axios from "axios";
import Alerta from "../components/Alerta";

function ConfirmarCuenta() {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams()
  const {id} = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `http://localhost:4000/api/veterinarios/confirmar/${id}`
        const {data} = await axios(url)
        console.log(data)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }

      setCargando(false)
    }
    confirmarCuenta();
  }, [])

  return (
    <>
      <div>
            <h1 className='text-indigo-600 font-black text-6xl'>
                Confirma tu Cuenta y Comienza a Administra tus 
                <span className='text-black'> Pacientes</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
           {!cargando && 
            <Alerta 
              alerta={alerta}
            />}

           {cuentaConfirmada && 
              <Link 
              className="block text-center my-5 text-gray-500"
              to='/'>Iniciar Sesión</Link>
           }
        </div>
    </>
  )
}

export default ConfirmarCuenta