import React, { Component } from "react";
import { Link } from "@reach/router";
import { getTopics } from "../api";

class Nav extends Component {
  state = { topics: [] };

  componentDidMount() {
    getTopics().then((topics) => {
      this.setState(topics);
    });
  }

  render() {
    return (
      <nav>
        {this.state.topics.map((topic) => {
          return <Link to={`/articles/${topic.slug}`}>{topic.slug}</Link>;
        })}
      </nav>
    );
  }
}

export default Nav;
