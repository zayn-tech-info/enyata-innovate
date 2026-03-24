import { useEffect, useState } from "react";
import { getCircles } from "../../api/circles.api";
import { Link } from "react-router-dom";
import { HiUsers, HiPlus, HiSearch } from "react-icons/hi";
import Loading from "../../components/common/Loading";

export default function Circles() {
  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getCircles()
      .then((res) => {
        console.log("Setting circles");
        setCircles(res.data ?? [])
        console.log(`Setting circles ${res.data}`);
  })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredCircles = circles.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div className="space-y-6 px-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Circles</h1>
          <p className="text-gray-500 mt-1">
            Manage your savings and contribution groups.
          </p>
        </div>
        <Link
          to="/create-circle"
          className="inline-flex items-center justify-center px-4 py-2 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors shadow-sm"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          Create Circle
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search circles..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      {filteredCircles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <HiUsers size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No circles found</h3>
          <p className="text-gray-500 mt-1 mb-6">
            {searchTerm
              ? `No circles match "${searchTerm}"`
              : "You haven't joined any circles yet."}
          </p>
          {!searchTerm && (
            <Link
              to="/create-circle"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-pink-700 bg-pink-100 hover:bg-pink-200"
            >
              Start a new circle
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCircles.map((c) => (
            <Link
              key={c._id}
              to={`/circles/${c._id}`}
              className="block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-pink-300 transition-all duration-200 group overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                    {c.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 capitalize">
                    {c.type}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-1 truncate group-hover:text-pink-600 transition-colors">
                  {c.name}
                </h3>
                
                <div className="space-y-3 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Balance</span>
                    <span className="font-bold text-gray-900">₦{c.escrowBalance?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Members</span>
                    <div className="flex items-center text-gray-900 font-medium">
                      <HiUsers className="w-4 h-4 mr-1 text-gray-400" />
                      {c.membersCount || 0}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
