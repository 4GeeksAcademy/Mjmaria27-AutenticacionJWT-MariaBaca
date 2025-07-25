import {
  useContext,
  useReducer,
  createContext,
  useMemo,
} from "react";
import storeReducer, { initialStore } from "../store.js";

// Exportamos el contexto para usarlo en otros hooks personalizados
export const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  const actions = useMemo(() => ({
    login: async (email, password) => {
      try {
        const resp = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await resp.json();
        console.log("[LOGIN] Respuesta del backend:", data);

        if (resp.ok && data.token) {
          localStorage.setItem("jwt_token", data.token);
          dispatch({
            type: "LOGIN",
            payload: { token: data.token, user_data: data.user },
          });
          return true;
        } else {
          console.error("[LOGIN] Error:", data.msg || "Token no recibido");
          return false;
        }
      } catch (error) {
        console.error("[LOGIN] Error de red o servidor:", error);
        return false;
      }
    },

    logout: () => {
      localStorage.removeItem("jwt_token");
      dispatch({ type: "LOGOUT" });
      dispatch({ type: "SET_BACKEND_CART", payload: [] });
      dispatch({ type: "ADD_ME", payload: null });
    },

    getUserInfo: async () => {
      const token = localStorage.getItem("jwt_token");

      if (!token || token === "null" || token === "undefined" || token.trim() === "") {
        console.warn("[getUserInfo] Token inválido o ausente.");
        return false;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.warn("[getUserInfo] Error de backend:", errorData);
          return false;
        }

        const data = await response.json();
        dispatch({ type: "ADD_ME", payload: data });
        return true;
      } catch (error) {
        console.error("[getUserInfo] Error al obtener usuario:", error);
        return false;
      }
    }
  }), [dispatch]);

  return (
    <StoreContext.Provider value={{ store, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  );
}

// Hook personalizado para consumir el contexto
export function useGlobalReducer() {
  return useContext(StoreContext);
}
