import { useEffect, useState } from "react";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const loadMessage = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      if (!backendUrl) {
        throw new Error("La variable VITE_BACKEND_URL no está definida en el .env");
      }

      const response = await fetch(`${backendUrl}/api/hello`);
      const data = await response.json();

      if (response.ok && data.message) {
        dispatch({ type: "set_hello", payload: data.message });
      } else {
        throw new Error(data.msg || "Respuesta inválida del backend");
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessage();
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h1 className="display-5">Bienvenido</h1>
      <p className="lead">Este es tu inicio en la aplicación.</p>

      <div className="mt-4">
        {loading && <div className="alert alert-info">Cargando mensaje...</div>}
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        {!loading && !errorMsg && store.message && (
          <div className="alert alert-success">{store.message}</div>
        )}
      </div>
    </div>
  );
};
