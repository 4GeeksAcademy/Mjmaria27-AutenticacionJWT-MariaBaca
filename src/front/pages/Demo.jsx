import { useGlobalReducer } from "../hooks/useGlobalReducer";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleClick = () => {
    dispatch({ type: "set_demo_message", payload: "Este es un mensaje desde Demo.jsx 🚀" });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Demo Page</h1>
      <p className="text-center">Esta página es útil para pruebas de estado global o componentes.</p>

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleClick}>
          Disparar mensaje demo
        </button>
      </div>

      {store.demoMessage && (
        <div className="alert alert-info text-center mt-4">
          <strong>Mensaje desde el estado global:</strong> {store.demoMessage}
        </div>
      )}
    </div>
  );
};
