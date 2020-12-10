import React from "react";
import { deleteComment } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCommentsByArticleId } from "../api";

const DeleteComment = (props) => {
  const comment_id = props.id;

  const handleClick = () => {
    deleteComment(comment_id);
    getCommentsByArticleId(props.article_id);
  };

  return (
    <div>
      <button class="btn" onClick={handleClick}>
        <FontAwesomeIcon className="delete-btn" icon="trash-alt" />
      </button>
    </div>
  );
};

export default DeleteComment;
