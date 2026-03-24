import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCircles } from "../../api/circles.api";
import { getEvents } from "../../api/events.api";
import { useAuthStore } from "../../store/auth.store";
import {
  HiPlus,
  HiUsers,
  HiCurrencyDollar,
  HiCalendar,
  HiArrowRight,
} from "react-icons/hi";
import Loading from "../../components/common/Loading";

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const [circles, setCircles] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(`User: ${JSON.stringify(user)}`)
    const fetchData = async () => {
      try {
        const [circlesRes, eventsRes] = await Promise.all([
          getCircles(),
          getEvents(),
        ]);
        setCircles(Array.isArray(circlesRes.data) ? circlesRes.data : []);
        setEvents(Array.isArray(eventsRes.data) ? eventsRes.data : []);
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
    0
  );
  
  // Filter active events properly if possible, or just take recent
  const activeEvents = events.filter((e) => e.status === "open");

  if (loading) return <Loading />;

  return (
    <div className="space-y-6 px-3 mt-2">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || "Member"}!
          </h1>
          <p className="text-gray-500 mt-1">
            Here’s what’s happening with your circles today.
          </p>
        </div>
        <Link
          to="/create-circle"
          className="inline-flex items-center justify-center px-4 py-2 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors shadow-sm"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          New Circle
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <MetricCard
          title="Total Balance"
          value={`₦${totalBalance.toLocaleString()}`}
          icon={HiCurrencyDollar}
          color="text-green-600"
          bg="bg-green-50"
        />
        <MetricCard
          title="Active Circles"
          value={circles.length}
          icon={HiUsers}
          color="text-purple-600"
          bg="bg-purple-50"
        />
        <MetricCard
          title="Pending Events"
          value={activeEvents.length}
          icon={HiCalendar}
          color="text-orange-600"
          bg="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Circles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Your Circles</h2>
            <Link
              to="/circles"
              className="text-sm font-medium text-pink-600 hover:text-pink-700 flex items-center"
            >
              View All <HiArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {circles.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">You haven&apos;t joined any circles yet.</p>
              <Link
                to="/create-circle"
                className="text-pink-600 font-medium mt-2 inline-block hover:underline"
              >
                Create one now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {circles.slice(0, 3).map((circle) => (
                <Link
                  key={circle._id}
                  to={`/circles/${circle._id}`}
                  className="block p-4 rounded-lg border border-gray-100 hover:border-pink-200 hover:bg-pink-50/30 transition-colors group bg-white"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
                        {circle.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-pink-700 transition-colors">
                          {circle.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {circle.membersCount || 1} members
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ₦{circle.escrowBalance?.toLocaleString() || 0}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {circle.type}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Active Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Active Events</h2>
          </div>
          {activeEvents.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No active events at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeEvents.slice(0, 3).map((event) => {
                const percent = Math.min(
                    ((event.collectedAmount || 0) /
                      (event.targetAmount || 1)) *
                      100,
                    100
                  );
                return (
                <Link
                  key={event._id}
                  to={`/events/${event._id}`}
                  className="block p-4 rounded-lg border border-gray-100 hover:border-pink-200 hover:bg-pink-50/30 transition-colors bg-white"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 truncate pr-2">{event.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                        event.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                    <div
                      className="bg-pink-500 h-1.5 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>
                      Raised: ₦{event.collectedAmount?.toLocaleString() || 0}
                    </span>
                    <span>
                      Goal: ₦{event.targetAmount?.toLocaleString() || 0}
                    </span>
                  </div>
                </Link>
              )})}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-200">
      <div className={`p-4 rounded-full ${bg} ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}
