import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PersonEdit from './PersonEdit ';
import PersonList from "./PersonList ";

class App extends Component {
  render() {
    return (
        <Router>
            <div className="container">
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/persons' exact={true} component={PersonList}/>
            <Route path='/persons/:id' component={PersonEdit}/>
          </Switch>
            </div>
        </Router>
    )
  }
}

export default App;