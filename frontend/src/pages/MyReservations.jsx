import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function MyReservations() {
  const { authTokens } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/reservations/", {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        });
        setReservations(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
      }
    };

    fetchReservations();
  }, [authTokens]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Mes Réservations
      </h1>

      {reservations.length === 0 ? (
        <p className="text-gray-600">Aucune réservation trouvée.</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((res) => (
            <li
              key={res.id}
              className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              <p><strong>Voiture :</strong> {res.car?.name}</p>
              <p><strong>Début :</strong> {res.start_date}</p>
              <p><strong>Fin :</strong> {res.end_date}</p>
              <p><strong>Statut :</strong> {res.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
