// store.js

export const initialStore = () => ({
  message: "",       // para Home.jsx
  token: null,       // para autenticación
  user_data: null,   // info del usuario logueado
  demoMessage: "",   // para Demo.jsx
  cart: [],          // opcional
});

export default function storeReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user_data: action.payload.user_data,
      };

    case "LOGOUT":
      return {
        ...state,
        token: null,
        user_data: null,
      };

    case "ADD_ME":
      return {
        ...state,
        user_data: action.payload,
      };

    case "SET_BACKEND_CART":
      return {
        ...state,
        cart: action.payload,
      };

    case "set_hello":
      return {
        ...state,
        message: action.payload,
      };

    case "set_demo_message":
      return {
        ...state,
        demoMessage: action.payload,
      };

    default:
      return state;
  }
}
