import React, { Component } from "react";
import { Link } from "@reach/router";
import { getTopics } from "../api";
import Button from "@material-ui/core/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Router } from "@reach/router";
import AddTopic from "./AddTopic";
import { navigate } from "@reach/router";
class Nav extends Component {
  state = { topics: [], isLoading: true };

  componentDidMount() {
    getTopics().then((topics) => {
      this.setState(topics);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.topics, this.state.topics);
    if (prevProps.topics !== this.state.topics) {
      console.log("hi");
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
      <div className="nac-container">
        <nav className="nav-items">
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Topics
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {this.state.topics.map((topic) => {
                return (
                  <div key={topic.slug}>
                    <Dropdown.Item>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/articles/${topic.slug}`}
                      >
                        <Button>{topic.slug}</Button>
                      </Link>
                    </Dropdown.Item>
                  </div>
                );
              })}
              <Dropdown.Item>
                <Link
                  style={{ textDecoration: "none" }}
                  params={this.state}
                  to={`/add-topic`}
                >
                  <Button style={{ background: "grey", color: "white" }}>
                    Add New Topic
                  </Button>
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <Link style={{ textDecoration: "none" }} to="/register">
          <Button style={{ backgroundColor: "#eb5c44" }}>Register</Button>
        </Link> */}
        </nav>
        <Router>
          <AddTopic
            loggedIn={loggedIn}
            topicAdder={this.topicAdder}
            path="/add-topic"
          ></AddTopic>
        </Router>
      </div>
    );
  }
}

export default Nav;
