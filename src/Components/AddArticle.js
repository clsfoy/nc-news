import React, { Component } from "react";
import { postArticle } from "../api";
import { navigate } from "@reach/router";
import ErrorMessage from "./ErrorMessage";

class AddArticle extends Component {
  state = { title: "", body: "", topic: "", author: "", hasErr: false };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    postArticle(this.state)
      .then((newArticle) => {
        console.log(newArticle);
        const article_id = newArticle[0].article_id;
        navigate(`/articles/id/${article_id}`);
      })
      .catch((err) => {
        this.setState({ hasErr: true });
      });
  };

  render() {
    const { hasErr } = this.state;
    if (hasErr) {
      return (
        <ErrorMessage
          errorMessage={
            "Oops...it's likely that your username was incorrect. Please try again."
          }
        />
      );
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit} className="new-article">
            <input
              required
              onChange={this.handleChange}
              id="title"
              type="text"
              placeholder="Title"
            ></input>
            <select id="topic" onChange={this.handleChange} placeholder="Topic">
              <option disabled>Topic</option>
              <option value="football">Football</option>
              <option value="cooking">Cooking</option>
              <option value="coding">Coding</option>
            </select>
            <textarea
              required
              onChange={this.handleChange}
              id="body"
              className="article-body"
              placeholder="Article body"
            ></textarea>
            <input
              required
              onChange={this.handleChange}
              id="author"
              type="text"
              placeholder="Username"
            ></input>
            <button type="submit">Post!</button>
          </form>
        </div>
      );
    }
  }
}

export default AddArticle;
