import { useEffect } from "react";
import { getCircles } from "../../api/circles.api";
import { useCircleStore } from "../../store/circle.store";
import { Link } from "react-router-dom";

export default function Circles() {
  const { circles, setCircles } = useCircleStore();

  useEffect(() => {
    getCircles().then((res) => setCircles(res.data));
  }, [setCircles]);

  return (
    <div>
      <h2>Circles</h2>
      {circles.map((c) => (
        <Link key={c._id} to={`/circles/${c._id}`}>
          <div>{c.name}</div>
        </Link>
      ))}
    </div>
  );
}
