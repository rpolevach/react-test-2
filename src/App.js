import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./components/login/index";
import Home from "./components/home/index";
import Favourites from "./components/favourites/index";
import Navbar from "./components/navbar";
import Results from "./components/searchResult";

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

const App = () => {
  useEffect(() => {
    if (!localStorage.getItem("db")) {
      localStorage.setItem(
        "db",
        JSON.stringify([
          {
            username: "test",
            requests: [
              {
                query: "wide",
                name: "test",
                maxResults: 15,
                order: "relevance",
              },
              {
                query: "lol",
                name: "test1",
                maxResults: 50,
                order: "date",
              },
            ],
          },
        ])
      );
    }
  }, []);

  return (
    <Router>
      <IsAuthRoute exact path="/login" component={Login} />

      <Switch>
        <AuthRoute exact path="/" component={Home} />
        <AuthRoute exact path="/fav" component={Favourites} />
        <AuthRoute exact path="/results" component={Results} />
      </Switch>
    </Router>
  );
};

export default App;
