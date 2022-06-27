import { timeSince } from "../../utils/time";

export default function ResponseTime({ created }) {
  const createdAt = new Date(created);
  const createdBefore = timeSince(createdAt);
  return (
    <div className="user-created-time">
      responsed <span>{createdBefore}</span> ago
    </div>
  );
}
