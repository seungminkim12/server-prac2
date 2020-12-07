import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./components/views/landingPage/LandingPage";
import LoginPage from "./components/views/loginPage/LoginPage";
import RegisterPage from "./components/views/registerPage/RegisterPage";
import auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={auth(LandingPage, null)} />
          <Route path="/login" component={auth(LoginPage, false)} />
          <Route path="/register" component={auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
