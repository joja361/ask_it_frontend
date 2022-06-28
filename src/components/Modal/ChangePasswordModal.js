import ReactDOM from "react-dom";
import Backdrop from "./BackDrop";
import ChangePasswordContent from "./ChangePasswordContent";

export default function ChangePasswordModal({ handleModal }) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop handleModal={handleModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ChangePasswordContent />,
        document.getElementById("modal-root")
      )}
    </>
  );
}
