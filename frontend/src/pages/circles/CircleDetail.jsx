import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCircle } from "../../api/circles.api";
import { useCircleStore } from "../../store/circle.store";

export default function CircleDetail() {
  const { id } = useParams();
  const { currentCircle, setCurrentCircle } = useCircleStore();

  useEffect(() => {
    getCircle(id).then((res) => setCurrentCircle(res.data));
  }, [id, setCurrentCircle]);

  if (!currentCircle) return <p>Loading...</p>;

  return (
    <div>
      <h2>{currentCircle.name}</h2>
      <p>Balance: ₦{currentCircle.escrowBalance}</p>
    </div>
  );
}
