import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // Formulaire de réservation
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reservationLoading, setReservationLoading] = useState(false);

  const isAuthenticated = !!localStorage.getItem("access");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/cars/${id}/`)
      .then((res) => {
        setCar(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Erreur lors du chargement des informations du véhicule.");
        setLoading(false);
      });
  }, [id]);

  const handleReservation = async (e) => {
    e.preventDefault();
    setReservationLoading(true);

    try {
      const token = localStorage.getItem("access");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/reservations/",
        {
          car_id: car.id,
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Réservation enregistrée ! Un email vous a été envoyé.",
        { duration: 5000 }
      );

      // Reset form
      setStartDate("");
      setEndDate("");

    } catch (err) {
      if (err.response?.data) {
        const errorMessage = Object.values(err.response.data).join("\n");
        toast.error(errorMessage);
      } else {
        toast.error("Erreur inconnue. Veuillez réessayer.");
      }
    } finally {
      setReservationLoading(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10">Chargement...</p>;

  if (!car)
    return <p className="text-center mt-10 text-red-600">
      Véhicule introuvable.
    </p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <Toaster />

      {/* IMAGE */}
      <img
        src={`http://127.0.0.1:8000${car.image}`}
        alt={car.brand}
        className="w-full h-64 object-cover rounded-md mb-4"
      />

      {/* DETAILS */}
      <h2 className="text-2xl font-bold mb-2">
        {car.brand} {car.model}
      </h2>

      <p className="text-gray-600 mb-4">{car.description}</p>

      <p className="text-lg font-semibold text-blue-600 mb-6">
        Prix par jour : {car.price_per_day} FCFA
      </p>

      {/* FORMULAIRE DE RÉSERVATION SI CONNECTÉ */}
      {isAuthenticated ? (
        <form
          onSubmit={handleReservation}
          className="bg-gray-100 p-4 rounded-md"
        >
          <h3 className="text-lg font-semibold mb-4">
            Réserver ce véhicule
          </h3>

          <label className="block font-medium">Date de début</label>
          <input
            type="date"
            value={startDate}
            required
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded w-full mb-3 p-2"
          />

          <label className="block font-medium">Date de fin</label>
          <input
            type="date"
            value={endDate}
            required
            min={startDate || new Date().toISOString().split("T")[0]}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded w-full mb-4 p-2"
          />

          <button
            type="submit"
            disabled={reservationLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
          >
            {reservationLoading ? "Réservation..." : "Réserver cette voiture"}
          </button>
        </form>
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
          <p className="mb-3 font-medium">
            Vous devez vous connecter pour réserver un véhicule.
          </p>

          <a
            href="/login"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition inline-block"
          >
            Se connecter
          </a>
        </div>
      )}
    </div>
  );
}
