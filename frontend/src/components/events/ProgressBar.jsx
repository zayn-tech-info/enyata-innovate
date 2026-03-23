import PropTypes from "prop-types";

export function ProgressBar({ value = 0 }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="h-2 rounded-full bg-brand-primary-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number,
};
