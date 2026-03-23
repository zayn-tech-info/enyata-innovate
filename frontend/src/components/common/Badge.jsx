import PropTypes from "prop-types";

export function Badge({ children, type = "default" }) {
  const styles = {
    default: "bg-gray-100 text-text-primary",
    success: "bg-success-500/10 text-success-500",
    error: "bg-error-500/10 text-error-500",
    warning: "bg-warning-500/10 text-warning-500",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded-md font-medium ${styles[type]}`}
    >
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["default", "success", "error", "warning"]),
};
