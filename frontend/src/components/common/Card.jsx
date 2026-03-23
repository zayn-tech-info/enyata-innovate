import PropTypes from "prop-types";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg--bg-card rounded-lg shadow-card p-4 border border-border-light ${className}`}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
