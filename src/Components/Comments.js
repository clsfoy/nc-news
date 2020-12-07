import React, { Component } from "react";
import { getCommentsByArticleId } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Comments extends Component {
  state = { comments: [] };

  componentDidMount() {
    getCommentsByArticleId(this.props.id).then((comments) => {
      this.setState(comments);
    });
  }

  render() {
    return (
      <div>
        <h1>Comments ({this.state.comments.length})</h1>
        {this.state.comments.map((comment) => {
          return (
            <div className="comment-card" key={comment.comment_id}>
              <div className="comment-header">
                <p>Written by {comment.author}</p>{" "}
                <div className="vote">
                  <p>{comment.votes}</p>
                  <FontAwesomeIcon icon="arrow-up" />
                  <FontAwesomeIcon icon="arrow-down" />
                </div>
              </div>
              <p>{comment.body}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Comments;
