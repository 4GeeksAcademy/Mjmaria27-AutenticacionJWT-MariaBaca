import { Link } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, actions } = useGlobalReducer();

  const handleLogout = () => {
    actions.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">MiApp</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
			
            {store.token ? (
              <>
                <li className="nav-item">
                  <span className="nav-link disabled">Hola, {store.user_data?.username || "Usuario"}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-outline-light nav-link" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
