import React, { Component } from "react";
import { getCommentsByArticleId } from "../api";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import Button from "@material-ui/core/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "@reach/router";

class Comments extends Component {
  state = {
    comments: [],
    sort_by: "created_at",
    sort_order: "desc",
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
    console.log("updated");
    const hasNewComment =
      prevState.comments.length !== this.state.comments.length;
    console.log(hasNewComment);
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
    console.log("comment adder");
    this.setState((currState) => {
      return {
        comments: [newComment, ...currState.comments],
        hasNewComment: true,
      };
    });
  };

  sortComments = (sort, order) => {
    this.setState((currState) => {
      return {
        comments: [...currState.comments],
        sort_by: sort,
        sort_order: order,
      };
    });
  };

  commentDeleter = () => {
    getCommentsByArticleId(
      this.props.id,
      this.state.sort_by,
      this.state.sort_order
    ).then((comments) => {
      this.setState(comments);
    });
  };

  handleChange = (event) => {
    const order = event.target.value;
    this.setState({ sort_order: order });
  };

  render() {
    const { loggedInUser, loggedIn } = this.props;
    return (
      <div className="comments-container">
        <AddComment
          loggedIn={loggedIn}
          loggedInUser={loggedInUser}
          articleId={this.props.id}
          commentAdder={this.commentAdder}
        ></AddComment>
        <div className="sort-comments">
          <Dropdown>
            <Dropdown.Toggle
              style={{
                margin: "1%",
                color: "white",
                background: "#eb5c44",
                border: "none",
              }}
            >
              Sort
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Button
                  style={{
                    color: "black",
                  }}
                  className="sort-button"
                  variant="outlined"
                  onClick={() => this.sortComments("author")}
                >
                  Author
                </Button>
              </Dropdown.Item>
              <Dropdown.Item>
                <Button
                  style={{
                    color: "black",
                  }}
                  variant="outlined"
                  onClick={() => this.sortComments("created_at")}
                >
                  Date
                </Button>
              </Dropdown.Item>
              <Dropdown.Item>
                <Button
                  style={{
                    color: "black",
                  }}
                  variant="outlined"
                  onClick={() => this.sortComments("votes")}
                >
                  Votes
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <select
            className="select"
            onChange={this.handleChange}
            name="order"
            id="order"
          >
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>
        {this.state.comments.length === 0 ? (
          <h4 style={{ color: "white" }}>
            You're the first here...add a comment to get the discussion started!
          </h4>
        ) : (
          this.state.comments.map((comment) => {
            return (
              <CommentCard
                id={comment.comment_id}
                voteUpdater={this.voteUpdater}
                commentDeleter={this.commentDeleter}
                loggedIn={loggedIn}
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
