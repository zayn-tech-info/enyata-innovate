import { HiRefresh } from "react-icons/hi";
import PropTypes from "prop-types";

export default function Loading({ text = "Loading...", dark = false }) {
  return (
    <div className="min-h-50 flex flex-col items-center justify-center">
      <HiRefresh
        className={`animate-spin text-3xl mb-3 ${
          dark ? "text-white" : "text-pink-900"
        }`}
      />

      <p
        className={`text-sm font-medium ${
          dark ? "text-white" : "text-gray-700"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
  dark: PropTypes.bool,
};
