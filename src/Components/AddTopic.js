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
        navigate(`/articles/${newTopic.slug}`);
      });
    });
  };

  render() {
    console.log(this.params);
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="new-article">
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
          <Button style={{ background: "white" }} type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default AddTopic;
