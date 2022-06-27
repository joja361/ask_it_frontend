import Avatar from "../Avatar";

export default function TopUserItem({
  userId,
  name,
  email,
  totalResponses,
  ...rest
}) {
  return (
    <div className="d-flex flex-column align-items-center">
      <div>
        <Avatar size={120} user={email} />
      </div>
      <div className="top-user-text text-center">
        <p>{name || email} has</p>
        <p className="top-user-text-number">{totalResponses}</p>
        <p>responses</p>
      </div>
    </div>
  );
}
