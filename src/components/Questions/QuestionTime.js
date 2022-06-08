import { timeSince } from "../../utils/time";

export default function QuestionTime({ created }) {
  const createdAt = new Date(created);
  const createdBefore = timeSince(createdAt);
  return <span>{createdBefore}</span>;
}
