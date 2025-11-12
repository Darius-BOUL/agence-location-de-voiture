import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CarDetail from "./pages/CarDetail";
import Reservation from "./pages/Reservation";
import MyReservations from "./pages/MyReservations";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* 🌐 Routes publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 🔒 Routes protégées (accès réservé aux utilisateurs connectés) */}
            <Route
              path="/reservation/:id"
              element={
                <ProtectedRoute>
                  <Reservation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-reservations"
              element={
                <ProtectedRoute>
                  <MyReservations />
                </ProtectedRoute>
              }
            />

            {/* 🚫 Page 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
