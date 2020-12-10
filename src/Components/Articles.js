import React, { Component } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import Button from "@material-ui/core/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "@reach/router";

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
    console.log(prevState.articles !== this.state.articles, "updated");
    const topic = this.props.topic;
    const diffProps = prevProps.topic !== this.props.topic;
    const diffSort = prevState.sort_by !== this.state.sort_by;
    const diffOrder = prevState.sort_order !== this.state.sort_order;

    // if (prevState.articles !== this.state.articles) {
    //   getArticles(topic, this.state.sort_by, this.state.sort_order).then(
    //     (articles) => {
    //       this.setState({ articles, isLoading: false });
    //     }
    //   );
    // }

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

  handleChange = (event) => {
    const order = event.target.value;
    this.setState({ sort_order: order });
  };

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className="articles-container">
          <div className="articles-header">
            <h3 className="topic-text">{this.props.topic || "All Articles"}</h3>
            <h3>
              🗞️
              {this.state.articles.length}
            </h3>
            <div className="sort">
              <Dropdown>
                <Dropdown.Toggle
                  style={{
                    margin: "1%",
                    color: "white",
                    background: "#eb5c44",
                  }}
                >
                  Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Button
                      style={{
                        color: "black",
                      }}
                      className="sort-button"
                      variant="outlined"
                      onClick={() => this.sortArticles("author")}
                    >
                      Author
                    </Button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button
                      style={{
                        color: "black",
                      }}
                      variant="outlined"
                      onClick={() => this.sortArticles("created_at")}
                    >
                      Date
                    </Button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button
                      style={{
                        color: "black",
                      }}
                      variant="outlined"
                      onClick={() => this.sortArticles("comment_count")}
                    >
                      Comments
                    </Button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button
                      style={{
                        color: "black",
                      }}
                      variant="outlined"
                      onClick={() => this.sortArticles("votes")}
                    >
                      Votes
                    </Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <select
                className="select"
                onChange={this.handleChange}
                name="order"
                id="order"
              >
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </select>
              <Link to="/add-article">
                <Button style={{ backgroundColor: "#eb5c44", color: "white" }}>
                  New Post
                </Button>
              </Link>
            </div>
          </div>

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
