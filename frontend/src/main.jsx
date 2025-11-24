import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 🔐 Auth context provider
import AuthProvider from "./context/AuthContext";

// 🎨 Global styles
import "./index.css";              // Tailwind core (base, components, utilities)s
import "./App.css";                // Styles globaux à toi
import "./styles/datepicker.css";  // Styles du calendrier moderne

// 🚀 Render App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
