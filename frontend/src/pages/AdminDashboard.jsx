import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Tu vas remplacer par tes endpoints Django
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [carsRes, customersRes, reservationsRes, paymentsRes] =
        await Promise.all([
          fetch("http://localhost:8000/api/cars/"),
          fetch("http://localhost:8000/api/customers/"),
          fetch("http://localhost:8000/api/reservations/"),
          fetch("http://localhost:8000/api/payments/"),
        ]);

      setCars(await carsRes.json());
      setCustomers(await customersRes.json());
      setReservations(await reservationsRes.json());
      setPayments(await paymentsRes.json());
    } catch (error) {
      console.error("Erreur chargement admin", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Tableau de Bord Administrateur
      </h1>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Cars */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Gestion des Voitures</h2>
          <p className="text-gray-600 mb-2">
            Total : <strong>{cars.length}</strong>
          </p>
          <Link
            to="/admin/cars"
            className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Voir les voitures
          </Link>
        </div>

        {/* Clients */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Gestion des Clients</h2>
          <p className="text-gray-600 mb-2">
            Total : <strong>{customers.length}</strong>
          </p>
          <Link
            to="/admin/customers"
            className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Voir les clients
          </Link>
        </div>

        {/* Reservations */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Réservations</h2>
          <p className="text-gray-600 mb-2">
            Total : <strong>{reservations.length}</strong>
          </p>
          <Link
            to="/admin/reservations"
            className="mt-3 inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            Voir les réservations
          </Link>
        </div>

        {/* Payments */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Paiements</h2>
          <p className="text-gray-600 mb-2">
            Total : <strong>{payments.length}</strong>
          </p>
          <Link
            to="/admin/payments"
            className="mt-3 inline-block bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
          >
            Voir les paiements
          </Link>
        </div>

      </div>
    </div>
  );
}
