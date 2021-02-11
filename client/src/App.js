import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";
import Filter from "./components/Filter";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Content from "./components/Content";
import AddResource from "./components/AddResource";
import UpdateResource from "./components/UpdateResource";
import NotFound from "./components/NotFound";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Header />
      <Searchbar />
      <Filter />
      <Switch>
        <main>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profile} />
          <Route path='/' exact={true} component={Content} />
          <Route path='/add_resource' component={AddResource} />
          <Route path='/update_resource' component={UpdateResource} />
          <Route path='*' component={NotFound} />
        </main>
      </Switch>
      <footer></footer>
    </Router>
  );
}
