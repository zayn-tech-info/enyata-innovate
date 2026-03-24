import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCircle } from "../../api/circles.api";
import { HiArrowLeft } from "react-icons/hi";

export default function CreateCircle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "welfare",
    contributionAmount: "",
    frequency: "per-event",
    quorumThreshold: 1,
  });

  const handleChange = (e) => {
    setError("")
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    if (!form.name || !form.contributionAmount) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: form.name,
        description: form.description,
        type: form.type,
        rules: {
          contributionAmount: Number(form.contributionAmount),
          currency: "NGN",
          frequency: form.frequency,
        },
        quorumThreshold: Number(form.quorumThreshold),
      };

      await createCircle(payload);
      navigate("/circles");
    } catch (err) {
      console.error(err);
      setError("Failed to create circle. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4 mr-1" />
          Back to Circles
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Create New Circle</h1>
        <p className="text-gray-500 mt-2">
          Start a new savings group or contribution circle.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm rounded-xl p-6 sm:p-8 space-y-6 border border-gray-100"
      >
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-md">
            <div className="flex">
              <div className="shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        {/* Circle Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Circle Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="e.g. Wedding Fund, Monthly Ajo"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-shadow outline-none"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Briefly describe the purpose of this circle..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-shadow outline-none resize-none"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Type */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Circle Type
            </label>
            <select
              id="type"
              name="type"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-shadow outline-none bg-white"
              value={form.type}
              onChange={handleChange}
            >
              <option value="welfare">Welfare</option>
              <option value="ajo">Ajo / Esusu</option>
              <option value="trip">Trip</option>
              <option value="project">Project</option>
              <option value="levy">Levy</option>
            </select>
          </div>

          {/* Frequency */}
          <div>
            <label
              htmlFor="frequency"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contribution Frequency
            </label>
            <select
              id="frequency"
              name="frequency"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-shadow outline-none bg-white"
              value={form.frequency}
              onChange={handleChange}
            >
              <option value="per-event">Per Event</option>
              <option value="one-time">One Time</option>
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contribution Amount */}
          <div>
            <label
              htmlFor="contributionAmount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contribution Amount (₦) <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">₦</span>
              </div>
              <input
                type="number"
                name="contributionAmount"
                id="contributionAmount"
                required
                min="0"
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-shadow outline-none"
                placeholder="0.00"
                value={form.contributionAmount}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Quorum Threshold */}
          <div>
            <label
              htmlFor="quorumThreshold"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Approval Quorum
            </label>
            <input
              type="number"
              name="quorumThreshold"
              id="quorumThreshold"
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-shadow outline-none"
              value={form.quorumThreshold}
              onChange={handleChange}
            />
            <p className="mt-1 text-xs text-gray-500">
              Minimum number of members required to approve payouts.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating..." : "Create Circle"}
          </button>
        </div>
      </form>
    </div>
  );
}
