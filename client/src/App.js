import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./components/views/landingPage/LandingPage";
import LoginPage from "./components/views/loginPage/LoginPage";
import RegisterPage from "./components/views/registerPage/RegisterPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
