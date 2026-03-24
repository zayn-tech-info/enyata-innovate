import { useEffect } from "react";
import { useAuthStore } from "./store/auth.store";
import AppRouter from "./routes/AppRouter";

export default function App() {
  const initAuth = useAuthStore((s) => s.initAuth);

  useEffect(() => {
    initAuth();
  }, []);

  return <AppRouter />;
}
