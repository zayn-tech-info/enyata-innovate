import PropTypes from "prop-types";

export function EmptyState({ title = "No data", description = "", action }) {
  return (
    <div className="text-center py-10">
      <h3 className="text-lg font-semibold text-text-primary">
        {title}
      </h3>
      <p className="text-sm text-text-muted mt-2">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.node,
};
