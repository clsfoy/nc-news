import React, { Component } from "react";
import { getArticleById } from "../api";
import FullArticleCard from "./FullArticleCard";
class SingleArticle extends Component {
  state = { article: {}, isLoading: true };

  componentDidMount() {
    const articleId = this.props.id;

    getArticleById(articleId).then(({ article }) => {
      this.setState({ article: article[0], isLoading: false });
    });
  }

  render() {
    const article = this.state.article;

    return (
      <div>
        <FullArticleCard article={article}></FullArticleCard>
      </div>
    );
  }
}

export default SingleArticle;
