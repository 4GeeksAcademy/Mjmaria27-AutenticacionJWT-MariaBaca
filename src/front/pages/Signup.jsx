import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const initialStateUser = {
  username: "",
  email: "",
  password: "",
};

export const Signup = () => {
  const [user, setUser] = useState(initialStateUser);
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (registered) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registered, navigate]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(initialStateUser);
        setRegistered(true);
      } else {
        alert(data.msg || "El usuario ya existe o faltan datos.");
      }
    } catch (error) {
      alert("Error de red o del servidor. Intenta más tarde.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="container">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-6 col-lg-4 mt-5">
          {registered && (
            <div className="alert alert-success text-center">
              ¡Usuario creado exitosamente! Serás redirigido al login...
            </div>
          )}
          <form
            className="border p-4 shadow rounded bg-white"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center mb-4">Registro</h2>

            <div className="form-group mb-3">
              <label htmlFor="username">Nombre de usuario:</label>
              <input
                id="username"
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                id="email"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="password">Contraseña:</label>
              <input
                id="password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <button className="btn btn-success w-100" type="submit">
              Registrar
            </button>

            <div className="text-center mt-3">
              <small>
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login">Inicia sesión</Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
