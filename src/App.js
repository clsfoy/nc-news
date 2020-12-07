import { Router } from "@reach/router";
import "./App.css";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Nav></Nav>
      <Router>
        {/* <Articles path="/"></Articles> */}
        <Articles path="/articles/:topic"></Articles>
      </Router>
    </div>
  );
}

export default App;
