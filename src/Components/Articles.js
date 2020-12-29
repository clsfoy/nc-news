import React, { Component } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import Button from "@material-ui/core/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "@reach/router";
import ScrollUpButton from "react-scroll-up-button";
import Nav from "./Nav";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at",
    sort_order: "desc",
  };

  componentDidMount() {
    const topic = this.props.topic;
    getArticles(topic, this.state.sort_by, this.state.sort_order).then(
      (articles) => {
        this.setState({ articles, isLoading: false });
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const topic = this.props.topic;
    const diffProps = prevProps.topic !== this.props.topic;
    const diffSort = prevState.sort_by !== this.state.sort_by;
    const diffOrder = prevState.sort_order !== this.state.sort_order;

    if (diffProps) {
      getArticles(topic).then((articles) => {
        this.setState({ articles, isLoading: false });
      });
    }

    if (diffSort || diffOrder) {
      getArticles(topic, this.state.sort_by, this.state.sort_order).then(
        (articles) => {
          this.setState({ articles, isLoading: false });
        }
      );
    }
  }

  sortArticles = (sort) => {
    this.setState((currState) => {
      return {
        articles: [...currState.articles],
        sort_by: sort,
      };
    });
  };

  articleDeleter = () => {
    const topic = this.props.topic;

    getArticles(topic, this.state.sort_by, this.state.sort_order).then(
      (articles) => {
        this.setState({ articles, isLoading: false });
      }
    );
  };

  handleChange = (event) => {
    const order = event.target.value;
    this.setState({ sort_order: order });
  };

  voteUpdater = () => {
    const topic = this.props.topic;
    getArticles(topic, this.state.sort_by, this.state.sort_order).then(
      (articles) => {
        this.setState({ articles, isLoading: false });
      }
    );
  };

  render() {
    const { loggedIn } = this.props;
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className="articles-container">
          <div className="articles-header">
            {/* <h4 className="topic-text">
              {this.props.topic || "All Articles"} 🗞️
              {this.state.articles.length}
            </h4> */}

            <div className="sort">
              <p>Sort Articles</p>
              <select
                className="select"
                onChange={this.handleChange}
                name="order"
                id="order"
              >
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </select>
              <Button
                style={{
                  color: "black",
                }}
                className="sort-button"
                // variant="outlined"
                onClick={() => this.sortArticles("author")}
              >
                Author
              </Button>
              {/* </Dropdown.Item>
                  <Dropdown.Item> */}
              <Button
                style={{
                  color: "black",
                }}
                onClick={() => this.sortArticles("created_at")}
              >
                Date
              </Button>
              {/* </Dropdown.Item>
                  <Dropdown.Item> */}
              <Button
                style={{
                  color: "black",
                }}
                onClick={() => this.sortArticles("comment_count")}
              >
                Comments
              </Button>
              {/* </Dropdown.Item>
                  <Dropdown.Item> */}
              <Button
                style={{
                  color: "black",
                  textAlign: "right",
                }}
                onClick={() => this.sortArticles("votes")}
              >
                Votes
              </Button>
              {/* </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
            </div>
          </div>
          <div className="articles-wrapper">
            <Nav loggedIn={this.state.loggedIn}></Nav>
            <div className="cards">
              {this.state.articles.length === 0 ? (
                <h4 style={{ color: "black" }}>
                  Nothing to see! Add a new post above to get started...
                </h4>
              ) : (
                this.state.articles.map((article) => {
                  return (
                    <ArticleCard
                      loggedIn={loggedIn}
                      voteUpdater={this.voteUpdater}
                      articleDeleter={this.articleDeleter}
                      loggedInUser={this.props.loggedInUser}
                      key={article.article_id}
                      article={article}
                    ></ArticleCard>
                  );
                })
              )}
            </div>
          </div>

          <ScrollUpButton />
        </div>
      );
    }
  }
}

export default Articles;
