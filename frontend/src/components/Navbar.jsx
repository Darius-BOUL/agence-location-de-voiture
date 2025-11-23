import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          2MS Multi Services
        </Link>

        {/* Liens de navigation */}
        <div className="space-x-6 flex items-center">
          <Link to="/" className="hover:text-blue-600 font-medium">
            Accueil
          </Link>

          {/* Si l'utilisateur est connecté */}
          {user ? (
            <>
              <Link
                to="/my-reservations"
                className="hover:text-blue-600 font-medium"
              >
                Mes Réservations
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Déconnexion
              </button>
            </>
          ) : (
            // Si l'utilisateur n’est pas connecté
            <>
              <Link
                to="/login"
                className="hover:text-blue-600 font-medium"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="hover:text-blue-600 font-medium"
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
