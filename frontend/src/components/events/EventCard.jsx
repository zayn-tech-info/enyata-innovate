import PropTypes from "prop-types";
import { ProgressBar } from "./ProgressBar";
import { Card } from "../common/Card";

export function EventCard({ event }) {
  const progress = (event.collectedAmount / event.targetAmount) * 100;

  return (
    <Card>
      <h3 className="font-semibold text-text-primary">
        {event.title}
      </h3>

      <p className="text-sm text-text-muted mt-1">
        {event.description}
      </p>

      <div className="mt-3">
        <ProgressBar value={progress} />
      </div>

      <div className="flex justify-between mt-2 text-sm">
        <span>₦{event.collectedAmount}</span>
        <span>₦{event.targetAmount}</span>
      </div>
    </Card>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    collectedAmount: PropTypes.number.isRequired,
    targetAmount: PropTypes.number.isRequired,
  }).isRequired,
};
