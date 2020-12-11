import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
  faTrashAlt,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Components/Footer";
import Login from "./Components/Login";

import AddArticle from "./Components/AddArticle";
import Register from "./Components/Register";
import ErrorMessage from "./Components/ErrorMessage";

library.add(fab, faThumbsUp, faThumbsDown, faComment, faTrashAlt, faNewspaper);

class App extends Component {
  state = { loggedInUser: "", loggedIn: false };

  login = (username) => {
    this.setState({ loggedInUser: username, loggedIn: true });
  };
  logout = () => {
    this.setState({ loggedInUser: "", loggedIn: false });
  };

  render() {
    const { loggedInUser, loggedIn } = this.state;

    return (
      <div className="main-border">
        <div className="main-content">
          <Header></Header>
          <banner className="banner">
            <Login
              loggedIn={this.state.loggedIn}
              logout={this.logout}
              login={this.login}
            ></Login>
            <Nav loggedIn={this.state.loggedIn}></Nav>
          </banner>
          <Router primary={false}>
            <Articles loggedInUser={loggedInUser} path="/"></Articles>
            <Articles path="/articles/:topic"></Articles>
            <SingleArticle
              loggedIn={loggedIn}
              loggedInUser={loggedInUser}
              path="/articles/id/:id"
            ></SingleArticle>
            <AddArticle path="add-article"></AddArticle>
            <Register path="/register"></Register>
            {/* <ErrorMessage
              errorMessage={
                "Sorry, that page doesn't exist - have a look through the topics above, or head home through the NC NEWS link."
              }
              default
            /> */}
          </Router>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default App;
