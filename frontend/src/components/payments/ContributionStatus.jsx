import PropTypes from "prop-types";
import { Badge } from "../common/Badge";

export function ContributionStatus({ status }) {
  const map = {
    pending: "warning",
    success: "success",
    failed: "error",
  };

  return <Badge type={map[status] || "default"}>{status}</Badge>;
}

ContributionStatus.propTypes = {
  status: PropTypes.string.isRequired,
};
