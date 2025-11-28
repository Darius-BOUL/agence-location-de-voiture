import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");  // Django authentifie sur username ou email selon ton backend
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,   // Important : Django SimpleJWT attend "username"
        password,
      });

      const { access, refresh, is_staff } = response.data;

      // 🔐 Sauvegarde token + rôle
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("is_staff", is_staff);

      // 🎯 Redirection selon rôle
      if (is_staff === true) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Identifiants incorrects");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nom d'utilisateur ou email"
          className="border p-2 w-full mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white w-full p-2 rounded">
          Se connecter
        </button>
      </form>
    </div>
  );
}
