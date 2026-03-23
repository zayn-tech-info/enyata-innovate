import PropTypes from "prop-types";
import { Badge } from "../common/Badge";
import { Card } from "../common/Card";

export function CircleCard({ circle, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer hover:scale-[1.02] transition-all"
    >
      <Card>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-text-primary">
              {circle.name}
            </h3>
            <p className="text-sm text-text-muted">
              {circle.members?.length || 0} members
            </p>
          </div>

          <Badge type="success">
            ₦{circle.escrowBalance?.toLocaleString()}
          </Badge>
        </div>
      </Card>
    </div>
  );
}

CircleCard.propTypes = {
  circle: PropTypes.shape({
    name: PropTypes.string.isRequired,
    members: PropTypes.array,
    escrowBalance: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
};
