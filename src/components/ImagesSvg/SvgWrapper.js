export default function SvgWrapper({ children }) {
  return (
    <div className="position-absolute d-none d-xxl-block svg">{children}</div>
  );
}
