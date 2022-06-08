import React from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

function QuestionLikeAndDislike() {
  return (
    <div className="d-flex justify-content-around flex-grow-1">
      <AiOutlineDislike className="dislike" />
      <AiOutlineLike className="like" />
    </div>
  );
}

export default QuestionLikeAndDislike;
