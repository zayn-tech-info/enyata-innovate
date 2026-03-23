import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function ProtectedRoute({ children }) {
  // const token = useAuthStore((s) => s.token);
  const token = "t";
  return token ? children : <Navigate to="/login" />;
}
