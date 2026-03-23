import PropTypes from "prop-types";
import {ProgressBar} from "../events/ProgressBar"

export function QuorumProgress({ approvals = 0, required = 1 }) {
  const percent = (approvals / required) * 100;

  return (
    <div>
      <ProgressBar value={percent} />
      <p className="text-xs mt-1 text-text-muted">
        {approvals}/{required} approvals
      </p>
    </div>
  );
}

QuorumProgress.propTypes = {
  approvals: PropTypes.number,
  required: PropTypes.number,
};
