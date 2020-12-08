import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
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
    const article_id = this.props.articleId;

    postComment(this.state, article_id).then((newComment) => {
      this.props.commentAdder(newComment);
      this.setState({ username: "", body: "" });
    });
  };

  render() {
    return (
      <div className="comment-form">
        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <TextField
            onChange={this.handleChange}
            required
            id="body"
            value={this.state.body}
            label="Comment"
          />
          <TextField
            onChange={this.handleChange}
            required
            value={this.state.userName}
            id="username"
            label="Username"
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}

export default AddComment;
