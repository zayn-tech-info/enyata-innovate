import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCircle } from "../../api/circles.api";

export default function CreateCircle() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "welfare",
    contributionAmount: "",
    frequency: "per-event",
    quorumThreshold: 1,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.contributionAmount) {
      alert("Name and contribution amount are required");
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
      alert("Failed to create circle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Create Circle</h2>

      {/* Name */}
      <input
        placeholder="Circle Name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        style={inputStyle}
      />

      {/* Description */}
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
        style={inputStyle}
      />

      {/* Type */}
      <select
        value={form.type}
        onChange={(e) => handleChange("type", e.target.value)}
        style={inputStyle}
      >
        <option value="welfare">Welfare</option>
        <option value="ajo">Ajo / Esusu</option>
        <option value="trip">Trip</option>
        <option value="project">Project</option>
        <option value="levy">Levy</option>
      </select>

      {/* Contribution Amount */}
      <input
        type="number"
        placeholder="Contribution Amount (₦)"
        value={form.contributionAmount}
        onChange={(e) => handleChange("contributionAmount", e.target.value)}
        style={inputStyle}
      />

      {/* Frequency */}
      <select
        value={form.frequency}
        onChange={(e) => handleChange("frequency", e.target.value)}
        style={inputStyle}
      >
        <option value="per-event">Per Event</option>
        <option value="monthly">Monthly</option>
        <option value="one-time">One Time</option>
      </select>

      {/* Quorum */}
      <input
        type="number"
        placeholder="Admin Approval Threshold"
        value={form.quorumThreshold}
        onChange={(e) => handleChange("quorumThreshold", e.target.value)}
        style={inputStyle}
      />

      {/* Submit */}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create Circle"}
      </button>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: "10px",
  padding: "10px",
};
