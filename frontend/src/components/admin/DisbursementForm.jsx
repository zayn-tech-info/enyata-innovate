import PropTypes from "prop-types";
import { Button } from "../common/Button";

export function DisbursementForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        className="w-full p-2 border rounded-md"
        placeholder="Account Number"
        name="account"
      />
      <input
        className="w-full p-2 border rounded-md"
        placeholder="Bank Code"
        name="bank"
      />
      <input
        className="w-full p-2 border rounded-md"
        placeholder="Amount"
        name="amount"
      />
      <Button type="submit">Request Disbursement</Button>
    </form>
  );
}

DisbursementForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
