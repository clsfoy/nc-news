import React, { Component } from "react";
import { postArticle } from "../api";
import { navigate } from "@reach/router";
import { getTopics } from "../api";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: "",
    author: "",
    hasErr: false,
    topics: [],
    isLoading: true,
  };

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

  componentDidMount() {
    getTopics().then((topics) => {
      this.setState({ topics: topics, isLoading: false });
    });
  }

  render() {
    const { hasErr } = this.state;
    const { isLoading } = this.state;
    console.log(isLoading);

    if (isLoading) {
      return <Loading></Loading>;
    } else {
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
              <select
                id="topic"
                onChange={this.handleChange}
                placeholder="Topic"
              >
                <option disabled>Topic</option>
                {this.state.topics.topics.map((topic) => {
                  return <option>{topic.slug}</option>;
                })}
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
}

export default AddArticle;
