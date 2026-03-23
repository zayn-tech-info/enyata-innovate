import PropTypes from "prop-types";

export default function Loading({ text = "Loading...", dark = false }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <div
        className={`w-6 h-6 border-2 rounded-full animate-spin
        ${
          dark
            ? "border-gray-600 border-t-white"
            : "border-gray-300 border-t-brand-primary-500"
        }`}
      />

      {text && (
        <p
          className={`text-sm ${
            dark ? "text-gray-300" : "text-text-muted"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
  dark: PropTypes.bool,
};
