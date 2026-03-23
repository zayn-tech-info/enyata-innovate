import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCircles } from "../../api/circles.api";
import { getEvents } from "../../api/events.api";
import { useAuthStore } from "../../store/auth.store";
import {
  HiPlus,
  HiClipboardList,
  HiLogout,
  HiUsers,
  HiCurrencyDollar,
  HiCalendar,
} from "react-icons/hi";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [circles, setCircles] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [circlesRes, eventsRes] = await Promise.all([
          getCircles(),
          getEvents(),
        ]);
        setCircles(circlesRes.data ?? []);
        setEvents(eventsRes.data ?? []);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalBalance = circles.reduce(
    (sum, c) => sum + (c.escrowBalance || 0),
    0,
  );
  const recentEvents = events.slice(0, 5);

  if (loading)
    return (
      <div className="min-h-screen p-6 bg-linear-to-br from-purple-400 to-pink-500">
        <Loading />
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-linear-to-br from-brand-secondary-500 to-brand-primary-500 text-primary-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">
            Welcome, {user?.name || "User"}
          </h2>
          <p className="text-gray-700 mt-1">Here’s your activity overview</p>
        </div>
        <button
          onClick={logout}
          className="mt-4 md:mt-0 flex items-center gap-2 bg-white text-pink-500 px-4 py-2 rounded-lg hover:bg-pink-50 transition font-semibold"
        >
          <HiLogout size={20} /> Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-3">
          <HiUsers size={28} className="text-pink-500" />
          <div>
            <h4 className="text-gray-700 font-semibold">Total Circles</h4>
            <p className="text-xl font-bold">{circles.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-3">
          <HiCurrencyDollar size={28} className="text-pink-500" />
          <div>
            <h4 className="text-gray-700 font-semibold">Total Balance</h4>
            <p className="text-xl font-bold">
              ₦{totalBalance.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-3">
          <HiCalendar size={28} className="text-pink-500" />
          <div>
            <h4 className="text-gray-700 font-semibold">Active Events</h4>
            <p className="text-xl font-bold">
              {events.filter((e) => e.status === "open").length}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/create-circle")}
            className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition font-semibold"
          >
            <HiPlus /> Create Circle
          </button>

          <button
            onClick={() => {
              navigate("/circles");
              toast.success("Success");
            }}
            className="flex items-center gap-2 bg-pink-100 text-pink-500 px-4 py-2 rounded-lg hover:bg-pink-200 transition font-semibold"
          >
            <HiClipboardList /> View Circles
          </button>
        </div>
      </div>

      {/* Circles List */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Your Circles</h3>
        {circles.length === 0 ? (
          <p>No circles yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {circles.map((circle) => (
              <div
                key={circle._id}
                onClick={() => navigate(`/circles/${circle._id}`)}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
              >
                <h4 className="font-semibold text-gray-800">{circle.name}</h4>
                <p className="text-pink-500 font-bold mt-1">
                  ₦{circle.escrowBalance?.toLocaleString() || 0}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Events */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Recent Events</h3>
        {recentEvents.length === 0 ? (
          <p>No events yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentEvents.map((event) => (
              <div
                key={event._id}
                onClick={() => navigate(`/events/${event._id}`)}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
              >
                <h4 className="font-semibold text-gray-800">{event.title}</h4>
                <p className="text-pink-500 font-bold mt-1">
                  ₦{event.collectedAmount} / ₦{event.targetAmount}
                </p>
                <small className="text-gray-600">Status: {event.status}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
