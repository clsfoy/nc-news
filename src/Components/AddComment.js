import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { postComment } from "../api";

class AddComment extends Component {
  state = { username: "", body: "" };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { loggedInUser } = this.props;
    const article_id = this.props.articleId;
    postComment(this.state, article_id).then((newComment) => {
      this.props.commentAdder(newComment);
      this.setState({ username: loggedInUser, body: "" });
    });
  };

  componentDidMount() {
    const { loggedInUser } = this.props;
    this.setState({ username: loggedInUser });
  }

  render() {
    return (
      <div className="comment-form">
        <h5>Got something to say...?</h5>

        <form className="comment-form" onSubmit={this.handleSubmit}>
          <label>
            <textarea
              style={{ height: "200px", width: "300px" }}
              required
              className="comment-body"
              type="text"
              onChange={this.handleChange}
              id="body"
              value={this.state.body}
              placeholder="Comment..."
            ></textarea>
          </label>
          <label>
            <input
              required
              type="text"
              onChange={this.handleChange}
              id="username"
              value={this.state.username}
              placeholder="Username"
            ></input>
          </label>
          <label>
            <Button type="submit">Submit</Button>
          </label>
        </form>
      </div>
    );
  }
}

export default AddComment;
