import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { upVoteArticle } from "../api";
class Voter extends Component {
  state = { voteChange: 0, hasVoted: false };

  handleClick = (val) => {
    const { articleId } = this.props;

    if (val === "up") {
      upVoteArticle(articleId, val);
      this.setState({ voteChange: 1, hasVoted: true });
    }

    if (val === "down") {
      upVoteArticle(articleId, val);
      this.setState({ voteChange: -1, hasVoted: true });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("updated");
    console.log(prevState, this.state);
    if (prevState !== this.state) {
    }
  }

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
            value="up"
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

export default Voter;
