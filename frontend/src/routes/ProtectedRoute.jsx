import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function ProtectedRoute({ children }) {
  const { token, isLoading } = useAuthStore((s) => ({
    token: s.token,
    isLoading: s.isLoading,
  }));

  const location = useLocation();

  if (isLoading) return <p>Loading...</p>;

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}