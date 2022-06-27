import { Link } from "react-router-dom";

export default function ErrorPage({ message }) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center page-not-found">
      <h1>{message}</h1>
      <h1>
        Return to <Link to="/">Home Page</Link>
      </h1>
    </div>
  );
}
