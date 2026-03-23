import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { initiatePayment } from "../../api/contributions.api";
import { HiCurrencyDollar, HiArrowLeft, HiHand } from "react-icons/hi";

export default function Contribute() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    
    setError("");
    setLoading(true);

    try {
      // Assuming initiatePayment returns { paymentUrl: '...' }
      // This might be a mock or direct call to backend
      const res = await initiatePayment({ eventId, amount: Number(amount) });
      
      if (res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      } else {
         // If no paymentUrl, maybe simulate success or show message
         alert("Payment initiated! (Mock: Redirecting to success)");
         navigate("/circles"); 
      }
    } catch (err) {
      console.error(err);
      setError("Payment initiation failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <HiArrowLeft className="w-4 h-4 mr-1" />
        Cancel Contribution
      </button>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
           <HiHand className="text-white w-12 h-12 opacity-80" />
        </div>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Make a Contribution</h2>
            <p className="text-gray-500 mt-2">Enter the amount you wish to contribute to this event.</p>
          </div>

          <form onSubmit={handlePay} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-100 flex items-center">
                 <span className="mr-2">⚠️</span> {error}
              </div>
            )}

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Contribution Amount (NGN)
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <span className="text-gray-500 sm:text-sm">₦</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-8 pr-12 sm:text-lg border-gray-300 rounded-lg py-3 transition-shadow"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="0.01"
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-gray-500 sm:text-sm">NGN</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all ${
                loading ? "opacity-75 cursor-not-allowed" : "hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              {loading ? "Processing Securely..." : "Proceed to Payment"}
            </button>
            
            <p className="text-xs text-center text-gray-400 mt-4">
              Secured by Interswitch
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
