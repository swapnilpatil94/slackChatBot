import React from 'react';
import {BrowserRouter as Router, Route,Link,Switch} from 'react-router-dom'
import './App.css';
import Login from './Components/Authentication/Login';
import Main from './Components/Main/Main';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/main' component={Main} />

      </Switch>
      
    </Router>

  );
}

export default App;
