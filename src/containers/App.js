import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import '../App.sass';
import Home from '../components/Home';
import Url from '../components/Url';
import TopUrl from '../components/TopUrl';
import Subscribe from '../components/Subscribe';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/top10" component={TopUrl} />
            <Route path="/subscribe" component={Subscribe} />
            <Route path="/:code" component={Url} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
