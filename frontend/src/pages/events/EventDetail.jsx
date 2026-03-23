import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEvent } from "../../api/events.api";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    getEvent(id).then((res) => setEvent(res.data));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>Target: ₦{event.targetAmount}</p>
      <p>Collected: ₦{event.collectedAmount}</p>

      <Link to={`/contribute/${event._id}`}>
        <button>Contribute</button>
      </Link>
    </div>
  );
}
