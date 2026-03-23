import PropTypes from "prop-types";
import { EmptyState } from "../common/EmptyState";
import { Badge } from "../common/Badge";

export function MemberList({ members = [] }) {
  if (!members.length) {
    return (
      <EmptyState
        title="No members"
        description="Invite people to join this circle."
      />
    );
  }

  return (
    <div className="space-y-2">
      {members.map((m) => (
        <div
          key={m.userId}
          className="flex justify-between items-center p-3 rounded-md bg-bg-card border border-gray-200"
        >
          <div>
            <p className="font-medium text-text-primary">
              {m.name || "Member"}
            </p>
            <p className="text-xs text-text-muted">{m.status}</p>
          </div>
          <Badge type={m.status === "active" ? "success" : "warning"}>
            {m.status}
          </Badge>
        </div>
      ))}
    </div>
  );
}

MemberList.propTypes = {
  members: PropTypes.array,
};
