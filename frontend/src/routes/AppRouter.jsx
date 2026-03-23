import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Circles from "../pages/circles/Circles";
import CircleDetail from "../pages/circles/CircleDetail";
import CreateCircle from "../pages/circles/CreateCircle";
import EventDetail from "../pages/events/EventDetail";
import Contribute from "../pages/contribute/Contribute";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/common/Layout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/circles" element={<Circles />} />
          <Route path="/circles/:id" element={<CircleDetail />} />
          <Route path="/create-circle" element={<CreateCircle />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/contribute/:eventId" element={<Contribute />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
