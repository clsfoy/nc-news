import { Router } from "@reach/router";
import "./App.css";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faArrowDown, faArrowUp);

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Nav></Nav>
      <Router>
        <Articles path="/articles"></Articles>
        <Articles path="/articles/:topic"></Articles>
        <SingleArticle path="/articles/id/:id"></SingleArticle>
      </Router>
    </div>
  );
}

export default App;
