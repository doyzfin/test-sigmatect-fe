import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import { Provider } from "react-redux";
// import { store, persistor } from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";

// import PrivateRoute from "./helpers/PrivateRoute";
// import PublicRoute from "./helpers/PublicRoute";

import Home from "./pages/Home/home";

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
          <Route path="/home" exact component={Home} />
        </Switch>
      </Router>
      //   </PersistGate>
      // </Provider>
    );
  }
}

export default App;
