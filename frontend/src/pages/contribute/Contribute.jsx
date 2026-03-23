import { useParams } from "react-router-dom";
import { initiatePayment } from "../../api/contributions.api";

export default function Contribute() {
  const { eventId } = useParams();

  const handlePay = async () => {
    const res = await initiatePayment({ eventId });

    // backend should return paymentUrl
    window.location.href = res.data.paymentUrl;
  };

  return (
    <div>
      <h2>Contribute</h2>
      <button onClick={handlePay}>Pay Now</button>
    </div>
  );
}
