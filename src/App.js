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
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

library.add(fab, faThumbsUp, faThumbsDown, faComment);

function App() {
  return (
    <div className="App">
      <banner className="banner">
        <Header></Header>
        <Nav></Nav>
      </banner>
      <Router primary={false}>
        <Articles path="/articles"></Articles>
        <Articles path="/articles/:topic"></Articles>
        <SingleArticle path="/articles/id/:id"></SingleArticle>
      </Router>
    </div>
  );
}

export default App;
