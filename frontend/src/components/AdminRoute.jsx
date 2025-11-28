import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const isStaff = localStorage.getItem("is_staff") === "true";

  if (!isStaff) {
    return <Navigate to="/" replace />;
  }

  return children;
}
