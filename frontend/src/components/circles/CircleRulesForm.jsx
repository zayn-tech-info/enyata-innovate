import PropTypes from "prop-types";
import {Button} from "../common/Button"

export function CircleRulesForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        className="w-full p-2 border rounded-md"
        placeholder="Contribution Amount"
        name="amount"
      />
      <select className="w-full p-2 border rounded-md" name="frequency">
        <option value="one-time">One-time</option>
        <option value="monthly">Monthly</option>
        <option value="per-event">Per Event</option>
      </select>
      <Button type="submit">Save Rules</Button>
    </form>
  );
}

CircleRulesForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
