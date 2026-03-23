import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCircle } from "../../api/circles.api";
import { useCircleStore } from "../../store/circle.store";
import { HiCurrencyDollar, HiUsers } from "react-icons/hi";
import Loading from "../../components/common/Loading";

export default function CircleDetail() {
  const { id } = useParams();
  const { currentCircle, setCurrentCircle } = useCircleStore();

  useEffect(() => {
    getCircle(id).then((res) => setCurrentCircle(res.data));
  }, [id, setCurrentCircle]);

  if (!currentCircle)
    return (
      <p className="min-h-screen p-6 bg-linear-to-br from-purple-400 to-pink-500">
        <Loading/>
      </p>
    );

  return (
    <div className="min-h-screen p-6 bg-linear-to-br from-purple-400 to-pink-500 text-gray-800">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">{currentCircle.name}</h2>
        <p className="text-gray-200 mt-1">Here’s an overview of your circle</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-3">
          <HiCurrencyDollar size={28} className="text-pink-500" />
          <div>
            <h4 className="text-gray-700 font-semibold">Balance</h4>
            <p className="text-xl font-bold mt-1">
              ₦{currentCircle.escrowBalance?.toLocaleString() || 0}
            </p>
          </div>
        </div>

        {currentCircle.membersCount !== undefined && (
          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-3">
            <HiUsers size={28} className="text-pink-500" />
            <div>
              <h4 className="text-gray-700 font-semibold">Members</h4>
              <p className="text-xl font-bold mt-1">
                {currentCircle.membersCount}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Description / Details */}
      {currentCircle.description && (
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition mb-8">
          <h4 className="text-gray-700 font-semibold mb-2">Description</h4>
          <p className="text-gray-800">{currentCircle.description}</p>
        </div>
      )}
    </div>
  );
}
