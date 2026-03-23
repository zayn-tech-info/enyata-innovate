import { useState } from "react";
import { useParams } from "react-router-dom";
import { initiatePayment } from "../../api/contributions.api";
import { HiCurrencyDollar } from "react-icons/hi";

export default function Contribute() {
  const { eventId } = useParams();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      const res = await initiatePayment({ eventId, amount: Number(amount) });
      // backend should return paymentUrl
      window.location.href = res.data.paymentUrl;
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-linear-to-br from-purple-400 to-pink-500 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Contribute
        </h2>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="text-gray-700 mb-1 flex items-center gap-1">
            <HiCurrencyDollar /> Amount
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition font-semibold flex justify-center items-center gap-2"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
