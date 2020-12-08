import React, { Component } from "react";
import { getArticleById } from "../api";
import FullArticleCard from "./FullArticleCard";
import Loading from "./Loading";
class SingleArticle extends Component {
  state = { article: {}, isLoading: true };

  componentDidMount() {
    const articleId = this.props.id;

    getArticleById(articleId).then((article) => {
      this.setState({ article, isLoading: false });
    });
  }

  render() {
    const article = this.state.article;
    console.log(article);
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <div>
          <FullArticleCard article={article[0]}></FullArticleCard>
        </div>
      );
    }
  }
}

export default SingleArticle;
