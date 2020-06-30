import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./components/login/index";
import Home from "./components/home";
import Favourites from "./components/favourites";
import Navbar from "./components/navbar";

const isAuth = () => {
  const token = localStorage.getItem("user");

  if (!token) return false;

  return true;
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
        <div>
          <Navbar />
          <Component {...props} />
        </div>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    }
  />
);

const IsAuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const App = () => (
  <Router>
    <IsAuthRoute exact path="/login" component={Login} />

    <Switch>
      <AuthRoute exact path="/" component={Home} />
      <AuthRoute exact path="/fav" component={Favourites} />
    </Switch>
  </Router>
);

export default App;
