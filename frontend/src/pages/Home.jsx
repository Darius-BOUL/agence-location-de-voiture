import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/cars/")
      .then(response => {
        setCars(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des voitures :", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-lg mt-10">Chargement des voitures...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Nos voitures disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map(car => (
          <div key={car.id} className="border rounded-2xl shadow p-4 hover:shadow-lg transition">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover rounded-xl"
            />
            <h2 className="text-xl font-semibold mt-3">{car.name}</h2>
            <p className="text-gray-700">Prix / jour : {car.price_per_day} FCFA</p>
            <Link
              to={`/cars/${car.id}`}
              className="mt-3 block bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Détails
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
