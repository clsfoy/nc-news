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
                <div>
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
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    );
  }
}

export default Nav;
