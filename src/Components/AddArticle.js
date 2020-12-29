import React, { Component } from "react";
import { postArticle } from "../api";
import { navigate } from "@reach/router";
import { getTopics } from "../api";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import Button from "@material-ui/core/Button";

class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: "",
    author: this.props.loggedInUser,
    topics: [],
    isLoading: true,
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, body, topic, author } = this.state;

    postArticle(title, body, topic, author)
      .then((newArticle) => {
        console.log(newArticle[0].article_id);
        const article_id = newArticle[0].article_id;
        navigate(`/`);
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
    const { loggedIn } = this.props;

    if (isLoading) {
      return <Loading></Loading>;
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
              placeholder="Please enter username"
            ></input>
            {loggedIn ? (
              <Button style={{ background: "white" }} type="submit">
                Post!
              </Button>
            ) : (
              <Button
                style={{ background: "white" }}
                disabled={true}
                type="submit"
              >
                Looks like you need to log in!
              </Button>
            )}
          </form>
        </div>
      );
    }
  }
}

export default AddArticle;
