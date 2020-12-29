import React, { Component } from "react";
import { getArticleById } from "../api";
import ErrorMessage from "./ErrorMessage";
import FullArticleCard from "./FullArticleCard";
import Loading from "./Loading";
import ScrollUpButton from "react-scroll-up-button";
class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    hasError: false,
    errorMessage:
      "Sorry, we can't find that article. To view an article in full, head back to the homepage and click an articles title 😀",
  };

  componentDidMount() {
    const articleId = this.props.id;

    getArticleById(articleId)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch((err) => {
        this.setState({ hasError: true, isLoading: false });
      });
  }

  render() {
    const article = this.state.article;
    const { loggedInUser, loggedIn } = this.props;

    if (this.state.isLoading) {
      return <Loading />;
    } else if (this.state.hasError) {
      return (
        <ErrorMessage errorMessage={this.state.errorMessage}></ErrorMessage>
      );
    } else {
      return (
        <div className="articles">
          <FullArticleCard
            loggedIn={loggedIn}
            loggedInUser={loggedInUser}
            article={article[0]}
          ></FullArticleCard>
          <ScrollUpButton />;
        </div>
      );
    }
  }
}

export default SingleArticle;
