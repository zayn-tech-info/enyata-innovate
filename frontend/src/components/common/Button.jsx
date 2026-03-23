import PropTypes from "prop-types";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base = "px-4 py-2 rounded-md font-medium transition-all duration-200";

  const variants = {
    primary:
      "bg-brand-primary-500 text-white hover:bg-brand-hover",
    secondary:
      "bg-gray-100 text-text-primary hover:bg-gray-200",
    ghost:
      "bg-transparent text-text-primary hover:bg-gray-100",
    danger: "bg-error-500 text-white hover:opacity-90",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "ghost", "danger"]),
  className: PropTypes.string,
};
