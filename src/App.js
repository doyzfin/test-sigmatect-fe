import React, { Component } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import { Provider } from "react-redux";
// import { store, persistor } from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import Home from "./pages/Home/home";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Register from "./pages/Register";

class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      //   <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Switch>
          {/* <Route path="/login" exact component={Login} /> */}

          {/* <PublicRoute
                restricted={true}
                path="/"
                exact
                component={Register}
              />
              <PublicRoute
                restricted={true}
                path="/login"
                exact
                component={Login}
              /> */}
          <PrivateRoute path="/home" exact component={Home} />
          <PublicRoute restricted={true} path="/" exact component={Login} />
          <PublicRoute
            restricted={true}
            path="/register"
            exact
            component={Register}
          />
          <PrivateRoute path="/movie/:id" exact component={Movies} />
        </Switch>
      </Router>
      //   </PersistGate>
      // </Provider>
    );
  }
}

export default App;
