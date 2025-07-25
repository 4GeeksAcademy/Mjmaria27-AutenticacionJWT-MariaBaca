import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

export const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await resp.json();

      if (resp.ok && data.token) {
        localStorage.setItem("jwt_token", data.token);
        dispatch({ type: "LOGIN", payload: { token: data.token, user_data: data.user } });
        navigate("/");
      } else {
        setErrorMsg(data.msg || "Credenciales inválidas.");
      }
    } catch (err) {
      setErrorMsg("Error de red o del servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow"
        style={{ minWidth: "300px", maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Iniciar sesión</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        {errorMsg && (
          <div className="alert alert-danger text-center">{errorMsg}</div>
        )}

        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? "Iniciando..." : "Entrar"}
        </button>

        <div className="text-center mt-3">
          <small>
            ¿No tienes cuenta? <a href="/signup">Regístrate aquí</a>
          </small>
        </div>
      </form>
    </div>
  );
};
