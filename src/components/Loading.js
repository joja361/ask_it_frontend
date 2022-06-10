import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <Spinner
      className="d-block mx-auto spinner-grow-empty-page"
      animation="grow"
      size="lg"
    />
  );
}
