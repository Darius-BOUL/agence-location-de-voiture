import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  // ✅ Vérifie si l'utilisateur est connecté
  const isAuthenticated = !!localStorage.getItem("access");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/cars/${id}/`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!car) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <img
        src={`http://127.0.0.1:8000${car.image}`}
        alt={car.brand}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{car.brand} {car.model}</h2>
      <p className="text-gray-600 mb-4">{car.description}</p>
      <p className="text-lg font-semibold text-blue-600 mb-6">
        Prix par jour : {car.price_per_day} FCFA
      </p>

      {/* 🔒 Vérifie la connexion */}
      {isAuthenticated ? (
        <button
          onClick={() => navigate(`/reservation/${car.id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Réserver cette voiture
        </button>
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
          <p className="mb-3 font-medium">
            ⚠️ Vous devez vous connecter pour accéder au service de réservation.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </div>
      )}
    </div>
  );
}
