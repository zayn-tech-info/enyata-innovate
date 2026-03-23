import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCircle } from "../../api/circles.api";
import { useCircleStore } from "../../store/circle.store";
import {
  HiCurrencyDollar,
  HiUsers,
  HiCalendar,
  HiCog,
  HiUserAdd,
  HiPlus,
} from "react-icons/hi";
import Loading from "../../components/common/Loading";

export default function CircleDetail() {
  const { id } = useParams();
  const { currentCircle, setCurrentCircle } = useCircleStore();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setLoading(true);
    getCircle(id)
      .then((res) => setCurrentCircle(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id, setCurrentCircle]);

  if (loading || !currentCircle) return <Loading />;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500 relative">
          <div className="absolute -bottom-10 left-8">
            <div className="w-24 h-24 rounded-xl bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-400">
                {currentCircle.name?.substring(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-12 px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                {currentCircle.name}
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700 capitalize border border-purple-200">
                  {currentCircle.type}
                </span>
              </h1>
              <p className="text-gray-500 mt-1 max-w-2xl">
                {currentCircle.description || "No description provided."}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center px-4 py-2 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors shadow-sm text-sm">
                <HiUserAdd className="w-4 h-4 mr-2" />
                Invite
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm">
                <HiCog className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-50 text-green-600">
                <HiCurrencyDollar size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Escrow Balance</p>
                <p className="text-xl font-bold text-gray-900">
                  ₦{currentCircle.escrowBalance?.toLocaleString() || "0.00"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                <HiUsers size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Members</p>
                <p className="text-xl font-bold text-gray-900">
                  {currentCircle.membersCount || 0}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
                <HiCalendar size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Next Contribution</p>
                <p className="text-sm font-bold text-gray-900">
                  {currentCircle.rules?.frequency || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="px-8 border-t border-gray-100">
          <nav className="flex space-x-8">
            {["overview", "members", "events", "transactions"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors capitalize ${
                  activeTab === tab
                    ? "border-pink-500 text-pink-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                </div>
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                  <p>No recent activity found.</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <HiPlus className="w-4 h-4 mr-2" />
                    Create Event
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    View Contributions
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Circle Rules</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex justify-between">
                    <span>Contribution:</span>
                    <span className="font-medium text-gray-900">₦{currentCircle.rules?.contributionAmount?.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Frequency:</span>
                    <span className="font-medium text-gray-900 capitalize">{currentCircle.rules?.frequency}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Quorum:</span>
                    <span className="font-medium text-gray-900">{currentCircle.quorumThreshold} votes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Placeholders for other tabs */}
        {activeTab !== "overview" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
            <p className="capitalize">{activeTab} content coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
