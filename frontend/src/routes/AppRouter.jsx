import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Circles from "../pages/circles/Circles";
import CircleDetail from "../pages/circles/CircleDetail";
import CreateCircle from "../pages/circles/CreateCircle";
import EventDetail from "../pages/events/EventDetail";
import Contribute from "../pages/contribute/Contribute";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/circles"
          element={
            <ProtectedRoute>
              <Circles />
            </ProtectedRoute>
          }
        />

        <Route
          path="/circles/:id"
          element={
            <ProtectedRoute>
              <CircleDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-circle"
          element={
            <ProtectedRoute>
              <CreateCircle />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/:id"
          element={
            <ProtectedRoute>
              <EventDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contribute/:eventId"
          element={
            <ProtectedRoute>
              <Contribute />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
