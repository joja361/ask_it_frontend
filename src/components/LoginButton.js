import { Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { authData } from "../store/authSlice";

export default function LoginButton() {
  const { loading } = useSelector(authData);
  return (
    <Button type="submit" className="w-100" disabled={loading}>
      {loading && (
        <Spinner
          className="me-2"
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
      {loading ? "Loading..." : "Login"}
    </Button>
  );
}
