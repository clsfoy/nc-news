import React, { Component } from "react";
import { Link } from "@reach/router";
import { getTopics } from "../api";
import Button from "@material-ui/core/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Router } from "@reach/router";
import AddTopic from "./AddTopic";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { navigate } from "@reach/router";
class Nav extends Component {
  state = { topics: [], isLoading: true };

  componentDidMount() {
    getTopics().then((topics) => {
      this.setState(topics);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topics !== this.state.topics) {
    }
  }

  topicAdder = (newTopic) => {
    getTopics().then((topics) => {
      this.setState(topics);
    });
  };

  render() {
    const { loggedIn } = this.props;
    return (
      <div className="nav-container">
        <div>
          <Link
            style={{
              textDecoration: "underline",
              textTransform: "capitalize",
              color: "black ",
              fontSize: "18px",
            }}
            to="/add-article"
          >
            <Button
              style={{
                color: "black",
                background: "white",
              }}
              variant="outlined"
              className="nav-btn"
            >
              New Post
            </Button>
          </Link>
        </div>
        <nav>
          <div className="nav-items">
            {this.state.topics.map((topic) => {
              return (
                <div className="nav-topic">
                  {/* <Accordion.Collapse eventKey="0"> */}
                  <Link
                    style={{
                      textDecoration: "none",
                      textTransform: "capitalize",
                      color: "black",
                    }}
                    to={`/articles/${topic.slug}`}
                  >
                    <Button
                      style={{
                        border: "grey 0.1px solid",
                        color: "black",
                        borderRadius: "10px",
                      }}
                      variant="outlined"
                      className="nav-btn"
                    >
                      {topic.slug}
                    </Button>
                  </Link>
                  {/* </Accordion.Collapse> */}
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
