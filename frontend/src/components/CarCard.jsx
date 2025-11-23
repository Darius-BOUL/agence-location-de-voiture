export default function CarCard({ car }) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
        <img
          src={car.image || "https://via.placeholder.com/300x200"}
          alt={car.name}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-semibold">{car.name}</h2>
        <p className="text-gray-600">{car.price_per_day} FCFA / jour</p>
      </div>
    );
  }
  