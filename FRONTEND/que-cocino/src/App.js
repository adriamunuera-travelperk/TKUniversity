import React from 'react';
import logo from './logo.svg';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom'
import {Nav, Button, Navbar, Form, FormControl} from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Homepage from './Homepage'
import Detail from './Detail'
import AddRecipe from './AddRecipe'


function App() {
  return (
    <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <NavLink exact to="/recipes/">Qué cocino</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Buscar recetas" className="mr-sm-2" />
              <Button variant="outline-success">Buscar</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      <Switch>
        <Route exact path='/recipes/' render={() => <Homepage/>}/>
        <Route exact path='/recipes/add/' render={() => <AddRecipe/>}/>
        <Route exact path={'/recipes/'+':id'} render={(props) => <Detail id={props.match.params.id}/>}/>
        <Redirect to='/recipes/'/>
      </Switch>
    </div>
  );
}

export default App;
