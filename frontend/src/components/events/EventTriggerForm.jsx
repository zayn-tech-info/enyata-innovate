import PropTypes from "prop-types";
import { Button } from "../common/Button";

export function EventTriggerForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        className="w-full p-2 border rounded-md"
        placeholder="Title"
        name="title"
      />
      <textarea
        className="w-full p-2 border rounded-md"
        placeholder="Description"
        name="description"
      />
      <input
        className="w-full p-2 border rounded-md"
        placeholder="Target Amount"
        name="target"
      />
      <Button type="submit">Create Event</Button>
    </form>
  );
}

EventTriggerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
