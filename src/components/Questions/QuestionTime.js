import { timeSince } from "../../utils/time";

export default function QuestionTime({ created }) {
  const createdAt = new Date(created);
  const createdBefore = timeSince(createdAt);
  return (
    <div className="m-0 user-created-time">
      asked <span>{createdBefore}</span> ago
    </div>
  );
}
