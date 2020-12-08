import React, { Component } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";

class Articles extends Component {
  state = { articles: [], isLoading: true };

  componentDidMount() {
    const topic = this.props.topic;

    getArticles(topic).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const topic = this.props.topic;
    const diffProps = prevProps.topic !== this.props.topic;

    if (diffProps) {
      getArticles(topic).then((articles) => {
        this.setState({ articles, isLoading: false });
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className="articles-container">
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
}

export default Articles;
