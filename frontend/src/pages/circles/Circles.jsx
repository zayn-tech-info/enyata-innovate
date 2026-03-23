import { useEffect } from "react";
import { getCircles } from "../../api/circles.api";
import { useCircleStore } from "../../store/circle.store";
import { Link } from "react-router-dom";
import { HiUsers } from "react-icons/hi";

export default function Circles() {
  const { circles, setCircles } = useCircleStore();

  useEffect(() => {
    getCircles().then((res) => setCircles(res.data ?? []));
  }, [setCircles]);

  return (
    <div className="min-h-screen p-6 bg-linear-to-br from-purple-400 to-pink-500 text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-white">Your Circles</h2>

      {circles.length === 0 ? (
        <p className="text-white">No circles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {circles.map((c) => (
            <Link key={c._id} to={`/circles/${c._id}`}>
              <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition flex items-center gap-3 cursor-pointer">
                <HiUsers size={28} className="text-pink-500" />
                <div>
                  <h3 className="font-semibold text-gray-800">{c.name}</h3>
                  <p className="text-pink-500 font-bold mt-1">
                    ₦{c.escrowBalance?.toLocaleString() || 0}
                  </p>
                  {c.membersCount && (
                    <small className="text-gray-600">
                      {c.membersCount} members
                    </small>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
