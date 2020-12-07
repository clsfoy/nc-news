import React, { Component } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

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
        <h3>{this.props.topic || "All Articles"}</h3>
        <p>Showing {this.state.articles.length} articles</p>
        {this.state.articles.map((article) => {
          return (
            <ArticleCard
              key={article.article_id}
              article={article}
            ></ArticleCard>
          );
        })}
      </div>
    );
  }
}

export default Articles;
