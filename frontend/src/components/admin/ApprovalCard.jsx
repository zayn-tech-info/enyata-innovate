import PropTypes from "prop-types";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { QuorumProgress } from "./QuorumProgress";

export function ApprovalCard({ request, onApprove }) {
  return (
    <Card>
      <h3 className="font-semibold">Disbursement Request</h3>
      <p className="text-sm text-text-muted">₦{request.amount}</p>
      <QuorumProgress
        approvals={request.approvals}
        required={request.required}
      />
      <Button className="mt-3" onClick={onApprove}>
        Approve
      </Button>
    </Card>
  );
}

ApprovalCard.propTypes = {
  request: PropTypes.shape({
    amount: PropTypes.number,
    approvals: PropTypes.number,
    required: PropTypes.number,
  }).isRequired,
  onApprove: PropTypes.func.isRequired,
};
