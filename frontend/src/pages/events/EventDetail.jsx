import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getEvent } from "../../api/events.api";
import { HiArrowLeft, HiOutlineFlag, HiCurrencyDollar, HiHand, HiCalendar } from "react-icons/hi";
import Loading from "../../components/common/Loading";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvent(id)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !event) return <Loading />;

  const percent = Math.min(((event.collectedAmount || 0) / (event.targetAmount || 1)) * 100, 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-pink-500 to-red-500 relative"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-10 mb-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-700 capitalize border border-pink-200">
                    {event.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize border ${
                    event.status === 'open' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
                <p className="text-gray-500 mt-2">
                   Organized by {event.createdBy?.name || "Member"}
                   {event.createdAt && ` • Founded on ${new Date(event.createdAt).toLocaleDateString()}`}
                </p>
              </div>
              <div className="flex-shrink-0">
                 {event.status === 'open' && (
                  <Link to={`/contribute/${event._id}`}>
                    <button className="flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      <HiHand size={20} /> Contribute Now
                    </button>
                  </Link>
                 )}
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex justify-between items-end mb-2">
                <div>
                   <span className="text-3xl font-bold text-gray-900">₦{event.collectedAmount?.toLocaleString() || 0}</span>
                   <span className="text-gray-500 ml-2">raised of ₦{event.targetAmount?.toLocaleString()} goal</span>
                </div>
                <span className="font-bold text-pink-600">{percent.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-pink-500 to-red-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">About this Event</h3>
                <div className="prose prose-pink text-gray-600">
                  <p>{event.description || "No description provided."}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
               <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-3">Details</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center gap-3">
                       <HiCurrencyDollar className="text-gray-400 w-5 h-5"/>
                       <span>Min. Contribution: <strong>₦{event.contributionAmount?.toLocaleString()}</strong></span>
                    </li>
                    <li className="flex items-center gap-3">
                       <HiCalendar className="text-gray-400 w-5 h-5"/>
                       <span>Created: {new Date(event.createdAt).toLocaleDateString()}</span>
                    </li>
                  </ul>
               </div>

               {event.beneficiary && event.beneficiary.accountNumber && (
                 <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                   <h4 className="font-semibold text-blue-900 mb-2">Beneficiary</h4>
                   <p className="text-sm text-blue-800 font-medium">{event.beneficiary.accountName || "N/A"}</p>
                   <p className="text-xs text-blue-600 mt-1">{event.beneficiary.bankCode} • {event.beneficiary.accountNumber}</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
