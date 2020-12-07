import React, { Component } from "react";
import { getArticles } from "../api";
class Articles extends Component {
  state = { articles: [] };

  componentDidMount() {
    const topic = this.props.topic;
    getArticles(topic).then((articles) => {
      this.setState(articles);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const topic = this.props.topic;
    const diffProps = prevProps.topic !== this.props.topic;

    if (diffProps) {
      getArticles(topic).then((articles) => {
        this.setState(articles);
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.articles.map((article) => {
          return <h2>{article.title}</h2>;
        })}
      </div>
    );
  }
}

export default Articles;
