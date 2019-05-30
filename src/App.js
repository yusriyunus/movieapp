import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class App extends React.Component {
  render() {
    return (
      <div className="App" style={{ textAlign: "center" }}>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/detail/:imdbID" component={Detail} />
        </Router>
      </div>
    );
  }
}

export default App;
