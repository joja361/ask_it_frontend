import { IoCaretUpSharp, IoCaretDownSharp } from "react-icons/io5";

export default function QuestionLikeAndDislike() {
  return (
    <div className="d-flex justify-content-center flex-grow-1">
      <IoCaretDownSharp className="like" />
      <span className="px-2">4</span>
      <IoCaretUpSharp className="dislike" />
    </div>
  );
}
