import PropTypes from "prop-types";
import { Button } from "../common/Button";
import {Card} from "../common/Card"

export function PaymentWidget({ amount, onPay }) {
  return (
    <Card>
      <p className="text-text-secondary">Amount</p>
      <h2 className="text-xl font-bold text-text-primary">₦{amount}</h2>
      <Button className="mt-4 w-full" onClick={onPay}>
        Pay Now
      </Button>
    </Card>
  );
}

PaymentWidget.propTypes = {
  amount: PropTypes.number.isRequired,
  onPay: PropTypes.func.isRequired,
};
