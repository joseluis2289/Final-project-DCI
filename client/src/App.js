import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Filter from "./components/Filter";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Content from "./components/Content";
import AddResource from "./components/Settings/AddResource";
import Settings from "./components/Settings/Settings";
import UpdateResource from "./components/Settings/UpdateResource";
import NotFound from "./components/NotFound";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Searchbar />
      <Filter />
      <Switch>
        <main>
          <Route path='/home' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profile} />
          <Route path='/' exact={true} component={Content} />
          <Route path='/settings' component={Settings} />
          <Route path='/add_resource' component={AddResource} />
          <Route path='/update_resource' component={UpdateResource} />
          <Route path='#!' component={NotFound} />
        </main>
      </Switch>
      <footer></footer>
    </Router>
  );
}
