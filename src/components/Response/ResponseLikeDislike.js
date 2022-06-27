import { useState } from "react";
import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authData } from "../../store/authSlice";
import { mainUrl } from "../../utils/axiosInstances";

export default function ResponseLikeAndDislike({
  id,
  totalLikes,
  like,
  dislike,
}) {
  const { isAuthenticated } = useSelector(authData);
  const [count, setCount] = useState(totalLikes);
  const [liked, setLiked] = useState(like);
  const [disliked, setDisliked] = useState(dislike);
  const { id: questionId } = useParams();

  const handleLike = async () => {
    if (isAuthenticated) {
      if (liked) {
        const { status } = await mainUrl.delete(
          `/questions/${questionId}/response/${id}/like`
        );
        if (status === 200) {
          setLiked(null);
          setCount((prev) => prev - 1);
        }
      } else if (disliked) {
        const { status } = await mainUrl.post(
          `/questions/${questionId}/response/${id}/like`
        );
        if (status === 200) {
          setLiked(true);
          setDisliked(null);
          setCount((prev) => prev + 2);
        }
      } else {
        const { status } = await mainUrl.post(
          `/questions/${questionId}/response/${id}/like`
        );
        if (status === 200) {
          setLiked(true);
          setCount((prev) => prev + 1);
        }
      }
    }
  };

  const handleDislike = async () => {
    if (isAuthenticated) {
      if (disliked) {
        const { status } = await mainUrl.delete(
          `/questions/${questionId}/response/${id}/dislike`
        );
        if (status === 200) {
          setDisliked(null);
          setCount((prev) => prev + 1);
        }
      } else if (liked) {
        const { status } = await mainUrl.post(
          `/questions/${questionId}/response/${id}/dislike`
        );
        if (status === 200) {
          setDisliked(true);
          setLiked(null);
          setCount((prev) => prev - 2);
        }
      } else {
        const { status } = await mainUrl.post(
          `/questions/${questionId}/response/${id}/dislike`
        );
        if (status === 200) {
          setDisliked(true);
          setCount((prev) => prev - 1);
        }
      }
    }
  };

  return (
    <div className="d-flex justify-content-center flex-grow-1">
      <IoCaretDownSharp
        onClick={handleDislike}
        className={`dislike ${disliked && "dislike-active"}`}
      />
      <span className="px-2">{count}</span>
      <IoCaretUpSharp
        onClick={handleLike}
        className={`like ${liked && "like-active"}`}
      />
    </div>
  );
}
