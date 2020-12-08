import React, { Component } from "react";
import { getCommentsByArticleId } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";

class Comments extends Component {
  state = { comments: [] };

  componentDidMount() {
    console.log(this.props);
    getCommentsByArticleId(this.props.id).then((comments) => {
      this.setState(comments);
    });
  }

  commentAdder = (newComment) => {
    this.setState((currState) => {
      console.log(newComment, "final new comment");
      return { comments: [...currState.comments, newComment] };
    });
  };

  render() {
    return (
      <div>
        <h3>
          <FontAwesomeIcon icon="comment" /> ({this.state.comments.length})
        </h3>
        <AddComment
          articleId={this.props.id}
          commentAdder={this.commentAdder}
        ></AddComment>
        {this.state.comments.map((comment) => {
          return <CommentCard comment={comment}></CommentCard>;
        })}
      </div>
    );
  }
}

export default Comments;
