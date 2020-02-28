import React from 'react';
import logo from './logo.svg';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom'
import {Nav, Jumbotron, Button} from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Homepage from './Homepage'
import Detail from './Detail'

function App() {
  return (
    <div className="App">
      <div>
        <Nav variant="pills" defaultActiveKey="/recipes/">
          <Nav.Item>
            <Nav.Link>
              <NavLink exact to="/recipes/">HOME</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink exact to="/recipes/?name=Pi">SEARCH</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink exact activeClassName={'activePage'} to="/recipes/1">DETAIL</NavLink>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <Switch>
        <Route exact path='/recipes/' render={() => <Homepage/>}/>
        <Route exact path={'/recipes/'+':id'} render={(props) => <Detail id={props.match.params.id}/>}/>
        <Redirect to='/recipes/'/>
      </Switch>
    </div>
  );
}

export default App;
