import SignIn from "./Pages/SignIn";
import NewAccount from "./Pages/NewAccount";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles.css";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route exact path="/create_account">
            <NewAccount />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
