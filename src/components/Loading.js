import { Spinner } from "react-bootstrap";

export default function Loading({ height = 200 }) {
  const test = 400;
  return (
    <div
      style={{ height: height }}
      className="d-flex justify-content-center align-items-center"
    >
      <Spinner className="spinner" animation="grow" size="lg" />
    </div>
  );
}
