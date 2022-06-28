import { useEffect } from "react";

export default function Backdrop({ handleModal }) {
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        handleModal();
      }
    };

    window.addEventListener("keydown", close);

    return () => {
      window.removeEventListener("keydown", close);
    };
  }, []);

  return <div className="modal-backdrop" onClick={handleModal}></div>;
}
