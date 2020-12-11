import React, { Component } from "react";
import { Link } from "@reach/router";
import { getTopics } from "../api";
import Button from "@material-ui/core/Button";
import Dropdown from "react-bootstrap/Dropdown";
class Nav extends Component {
  state = { topics: [] };

  componentDidMount() {
    getTopics().then((topics) => {
      this.setState(topics);
    });
  }

  render() {
    return (
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
    );
  }
}

export default Nav;
