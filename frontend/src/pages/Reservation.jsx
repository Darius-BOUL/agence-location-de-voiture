import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DateRangePicker from "../components/DateRangePicker";

export default function Reservation() {
  const { id } = useParams();               // ID de la voiture
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);

  // Dates sélectionnées dans le DatePicker
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDates = (range) => {
    setDates(range);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dates.startDate || !dates.endDate) {
      alert("Veuillez sélectionner une période.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reservations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.access}`,
        },
        body: JSON.stringify({
          car_id: parseInt(id),
          start_date: dates.startDate.toISOString().split("T")[0],
          end_date: dates.endDate.toISOString().split("T")[0],
        }),
      });

      if (!response.ok) throw new Error("Erreur de réservation");

      alert("✅ Réservation effectuée !");
      navigate("/my-reservations");
    } catch (error) {
      console.error("Erreur API :", error);
      alert("❌ Impossible de faire la réservation. Vérifiez vos dates.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Réserver cette voiture
      </h2>

      {/* Date picker */}
      <div className="mb-4">
        <DateRangePicker onChange={handleDates} />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition mt-4"
      >
        Confirmer la réservation
      </button>
    </div>
  );
}
