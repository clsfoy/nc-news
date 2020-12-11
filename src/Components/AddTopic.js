import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { postTopic } from "../api";
import { getTopics } from "../api";
import { navigate } from "@reach/router";
class AddTopic extends Component {
  state = { slug: "", description: "" };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    postTopic(this.state).then((newTopic) => {
      getTopics().then((topics) => {
        this.props.topicAdder(newTopic);
      });
    });
  };

  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="new-topic">
          <input
            onChange={this.handleChange}
            id="slug"
            value={this.state.slug}
            placeholder="Topic name..."
            type="text"
          ></input>
          <input
            onChange={this.handleChange}
            id="description"
            value={this.state.description}
            placeholder="Whats it all about?"
            type="text"
          ></input>
          {loggedIn ? (
            <div>
              <Button style={{ background: "white" }} type="submit">
                Submit
              </Button>
              <h4>Head to your new topic page through the dropdown above!</h4>{" "}
            </div>
          ) : (
            <div>
              <Button
                disabled={true}
                style={{ background: "white" }}
                type="submit"
              >
                Looks like you need to log in
              </Button>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default AddTopic;
