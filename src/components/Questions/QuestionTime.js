import { Link } from "react-router-dom";
import { timeSince } from "../../utils/time";

export default function QuestionTime({ created, name, userId }) {
  const createdAt = new Date(created);
  const createdBefore = timeSince(createdAt);
  return (
    <div className="m-0 user-created-time">
      asked <span>{createdBefore}</span> ago by{" "}
      <span>
        <Link className="user-name" to={`/user/${userId}`}>
          {name}
        </Link>
      </span>
    </div>
  );
}
