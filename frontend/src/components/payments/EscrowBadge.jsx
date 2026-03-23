import PropTypes from "prop-types";

export function EscrowBadge({ amount = 0 }) {
  return (
    <div className="px-3 py-1 rounded-full bg-success-500/10 text-success-500 font-medium">
      ₦{amount.toLocaleString()}
    </div>
  );
}

EscrowBadge.propTypes = {
  amount: PropTypes.number,
};
