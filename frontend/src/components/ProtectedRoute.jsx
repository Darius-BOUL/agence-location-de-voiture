// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // 🔒 Si l'utilisateur n'est pas connecté → redirection vers /login
  // avec sauvegarde de la page d'origine
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ Sinon, on affiche la page demandée
  return children;
}
