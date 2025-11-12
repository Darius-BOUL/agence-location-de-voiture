const API_URL = "http://127.0.0.1:8000/api/";

export async function fetchCars() {
  const response = await fetch(`${API_URL}cars/`);
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des voitures");
  }
  return response.json();
}
