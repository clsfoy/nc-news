import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { upVoteArticle } from "../api";
class Voter extends Component {
  state = { voteChange: 0, votes: +this.props.votes, hasVoted: false };

  handleClick = (val) => {
    const { articleId, type, comment_id } = this.props;
    const vote = +val;

    upVoteArticle(articleId, vote, type, comment_id).then((data) => {
      const votes = data[0].votes;
      this.setState((currentState) => {
        const newState = {
          votes: votes,
          voteChange: vote,
        };
        return newState;
      });
    });
  };

  render() {
    const { votes, voteChange } = this.state;
    const upVoted = voteChange === 1;
    const downVoted = voteChange === -1;

    return (
      <div className="voter">
        <p>{votes} votes</p>
        {upVoted ? (
          <button
            class="btn"
            disabled={true}
            value="1"
            onClick={() => this.handleClick("1")}
          >
            <FontAwesomeIcon icon="thumbs-up" />
          </button>
        ) : (
          <button
            class="btn"
            disabled={false}
            value="1"
            onClick={() => this.handleClick("1")}
          >
            <FontAwesomeIcon icon="thumbs-up" />
          </button>
        )}
        {downVoted ? (
          <button
            class="btn"
            disabled={true}
            value="-1"
            onClick={() => this.handleClick("-1")}
          >
            <FontAwesomeIcon icon="thumbs-down" />
          </button>
        ) : (
          <button
            class="btn"
            disabled={false}
            value="-1"
            onClick={() => this.handleClick("-1")}
          >
            <FontAwesomeIcon icon="thumbs-down" />
          </button>
        )}
      </div>
    );
  }
}

export default Voter;
