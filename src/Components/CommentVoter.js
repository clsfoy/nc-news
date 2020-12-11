import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { upVoteComment } from "../api";
class CommentVoter extends Component {
  state = { voteChange: 0, hasVoted: false };

  handleClick = (val) => {
    const { comment_id } = this.props;

    if (val === "up") {
      upVoteComment(comment_id, val).then(
        this.setState({ voteChange: 1, hasVoted: true })
      );
    }

    if (val === "down") {
      upVoteComment(comment_id, val).then(
        this.setState({ voteChange: -1, hasVoted: true })
      );
    }
  };

  render() {
    const { votes } = this.props;
    const { voteChange } = this.state;
    return (
      <div className="voter">
        <h4>
          {votes + voteChange}
          <button
            value="up"
            onClick={() => {
              this.handleClick("up");
            }}
            disabled={false}
            class="btn"
          >
            <FontAwesomeIcon icon="thumbs-up" />
          </button>
          <button
            value="down"
            onClick={() => {
              this.handleClick("down");
            }}
            disabled={false}
            class="btn"
          >
            <FontAwesomeIcon icon="thumbs-down" />
          </button>
        </h4>
      </div>
    );
  }
}

export default CommentVoter;
