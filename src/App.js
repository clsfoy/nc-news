import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./Components/Header";
import AddArticle from "./Components/AddArticle";
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
import Register from "./Components/Register";
import ErrorMessage from "./Components/ErrorMessage";

library.add(fab, faThumbsUp, faThumbsDown, faComment, faTrashAlt, faNewspaper);

class App extends Component {
  state = { loggedInUser: "happyamy2016", loggedIn: true };

  login = (username) => {
    this.setState({ loggedInUser: username, loggedIn: true });
  };
  logout = () => {
    this.setState({ loggedInUser: "", loggedIn: false });
  };

  render() {
    const { loggedInUser, loggedIn } = this.state;

    return (
      <div className="app">
        <div className="main-content">
          <banner className="banner">
            <Header></Header>
            <Login
              loggedIn={this.state.loggedIn}
              logout={this.logout}
              login={this.login}
            ></Login>
          </banner>

          <Router primary={false}>
            <Articles
              loggedIn={loggedIn}
              loggedInUser={loggedInUser}
              path="/"
            ></Articles>
            <Articles path="/articles/:topic"></Articles>
            <SingleArticle
              loggedIn={loggedIn}
              loggedInUser={loggedInUser}
              path="/articles/id/:id"
            ></SingleArticle>
            <Register path="/register"></Register>
            <AddArticle
              loggedInUser={loggedInUser}
              loggedIn={loggedIn}
              path="/add-article"
            ></AddArticle>
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
