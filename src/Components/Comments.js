import React, { Component } from "react";
import { getCommentsByArticleId } from "../api";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import Button from "@material-ui/core/Button";
import Dropdown from "react-bootstrap/Dropdown";

class Comments extends Component {
  state = {
    comments: [],
    sort_by: "created_at",
    sort_order: "",
    hasNewComment: false,
  };

  componentDidMount() {
    getCommentsByArticleId(
      this.props.id,
      this.state.sort_by,
      this.state.sort_order
    ).then((comments) => {
      this.setState(comments);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const hasNewComment = prevState.hasNewComment !== this.state.hasNewComment;
    const diffSort = prevState.sort_by !== this.state.sort_by;
    const diffOrder = prevState.sort_order !== this.state.sort_order;
    if (hasNewComment) {
      getCommentsByArticleId(
        this.props.id,
        this.state.sort_by,
        this.state.sort_order
      ).then((comments) => {
        this.setState(comments);
      });
    }

    if (diffSort || diffOrder) {
      getCommentsByArticleId(
        this.props.id,
        this.state.sort_by,
        this.state.sort_order
      ).then((comments) => {
        this.setState(comments);
      });
    }
  }

  commentAdder = (newComment) => {
    this.setState((currState) => {
      return {
        comments: [...currState.comments, newComment],
        hasNewComment: true,
      };
    });
  };

  sortComments = (sort) => {
    this.setState((currState) => {
      return {
        comments: [...currState.comments],
        sort_by: sort,
      };
    });
  };

  handleChange = (event) => {
    const order = event.target.value;

    this.setState({ sort_order: order });
  };

  render() {
    const { loggedInUser } = this.props;
    return (
      <div className="comments-container">
        <AddComment
          loggedInUser={loggedInUser}
          articleId={this.props.id}
          commentAdder={this.commentAdder}
        ></AddComment>

        {this.state.comments.length === 0 ? (
          <h4 style={{ color: "white" }}>
            You're the first here...add a comment to get the discussion started!
          </h4>
        ) : (
          this.state.comments.map((comment) => {
            return (
              <CommentCard
                voteUpdater={this.voteUpdater}
                loggedInUser={loggedInUser}
                key={comment.comment_id}
                article_id={this.props.id}
                comment={comment}
              ></CommentCard>
            );
          })
        )}
      </div>
    );
  }
}

export default Comments;
