import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEvent } from "../../api/events.api";
import { HiOutlineFlag, HiCurrencyDollar, HiHand } from "react-icons/hi";
import Loading from "../../components/common/Loading";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    getEvent(id).then((res) => setEvent(res.data));
  }, [id]);

  if (!event)
    return (
      <p className="min-h-screen p-6 bg-linear-to-br from-purple-400 to-pink-500">
        <Loading/>
      </p>
    );

  return (
    <div className="min-h-screen p-6 bg-linear-to-br from-purple-400 to-pink-500 text-gray-800">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">{event.title}</h2>
        <p className="text-gray-200 mt-1">
          Event overview and contribution info
        </p>
      </div>

      {/* Event Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-3">
          <HiOutlineFlag size={28} className="text-pink-500" />
          <div>
            <h4 className="text-gray-700 font-semibold">Target Amount</h4>
            <p className="text-xl font-bold mt-1">
              ₦{event.targetAmount?.toLocaleString() || 0}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-3">
          <HiCurrencyDollar size={28} className="text-pink-500" />
          <div>
            <h4 className="text-gray-700 font-semibold">Collected</h4>
            <p className="text-xl font-bold mt-1">
              ₦{event.collectedAmount?.toLocaleString() || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      {event.description && (
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition mb-8">
          <h4 className="text-gray-700 font-semibold mb-2">Description</h4>
          <p className="text-gray-800">{event.description}</p>
        </div>
      )}

      {/* Contribute Button */}
      <Link to={`/contribute/${event._id}`}>
        <button className="flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition font-semibold">
          <HiHand size={20} /> Contribute
        </button>
      </Link>
    </div>
  );
}
