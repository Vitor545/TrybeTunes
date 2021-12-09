import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import PageEdit from './pages/PageEdit';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/carteira" component={ Wallet } />
      <Route exact path="/test" component={ PageEdit } />
    </Switch>
  );
}

export default App;
